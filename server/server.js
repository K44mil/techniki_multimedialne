const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const http = require('http');
const fileupload = require('express-fileupload');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { userJoin, userLeave, getRoomUsers, getCurrentUser } = require('./utils/chatUser');
const { formatMessage } = require('./utils/chatMessage');
const ChatMessage = require('./models/ChatMessage.model');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const authRoutes = require('./routes/auth.routes');
const groupsRoutes = require('./routes/groups.routes');
const invitationsRoutes = require('./routes/invitations.routes');
const tasksRoutes = require('./routes/tasks.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const notificationsRoutes = require('./routes/notifications.routes');
const filesRoutes = require('./routes/files.routes');
const ratesRoutes = require('./routes/rates.routes');
const messagesRoutes = require('./routes/chatmessages.routes');
const testsRoutes = require('./routes/tests.routes');

const app = express();
const httpServer = http.Server(app);
const io = require('socket.io')(httpServer);

io.on('connection', socket => {
  // User join to room
  console.log('User connected.');
  
  socket.on('joinRoom', ({ user, room }) => {
    const chatUser = userJoin(socket.id, user, room);
    if (chatUser) {
      socket.join(chatUser.room);
      // Send users and room info
      io.to(chatUser.room).emit('roomUsers', {
        chatUsers: getRoomUsers(chatUser.room)
      });
    }
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.user.firstName + " " + user.user.lastName, msg));
    // Message.create({ username: user.username, text: msg }).then(m => console.log(m));
    
    ChatMessage.create({ text: msg, user: user.user._id, group: user.room }).then(() => console.log("saved."));
  });

  socket.on('disconnect', () => {
    const chatUser = userLeave(socket.id);
    console.log('User disconnected.');
    if (chatUser) {
      // Send users and room info
      io.to(chatUser.room).emit('roomUsers', {
        chatUsers: getRoomUsers(chatUser.room)
      });
    }
  });
});

// Body parser
app.use(express.json());

// File uploading
app.use(fileupload());

// Logging middleware only in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/groups', groupsRoutes);
app.use('/api/v1/invitations', invitationsRoutes);
app.use('/api/v1/tasks', tasksRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/notifications', notificationsRoutes);
app.use('/api/v1/files', filesRoutes);
app.use('/api/v1/rates', ratesRoutes);
app.use('/api/v1/messages', messagesRoutes);
app.use('/api/v1/tests', testsRoutes);

// Set error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = httpServer.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}.`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
