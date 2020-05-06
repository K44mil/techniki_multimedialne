const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const User = require('./models/User.model');
const Invitation = require('./models/Invitation.model');
const Group = require('./models/Group.model');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Read JSON files
const users = JSON.parse(
    fs.readFileSync(`${__dirname}/_db/users.json`, 'utf-8')
);

const groups = JSON.parse(
    fs.readFileSync(`${__dirname}/_db/groups.json`, 'utf-8')
);

const invitations = JSON.parse(
    fs.readFileSync(`${__dirname}/_db/invitations.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
    try {
        await User.create(users);
        await Group.create(groups);
        await Invitation.create(invitations);
        console.log('Data Imported...');
        process.exit();
    } catch (err) {
        console.error(err);
    }
};
  
// Delete data
const deleteData = async () => {
    try {
        await User.deleteMany();
        await Group.deleteMany();
        await Invitation.deleteMany();
        console.log('Data Destroyed...');
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}