const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

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

const app = express();

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

// Set error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}.`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});