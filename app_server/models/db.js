const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1';
const port = process.env.DB_PORT || '27017';
const dbURI = `mongodb://${host}:${port}/travlr`;

// connect and fail fast if unreachable
mongoose.connect(dbURI, {
  serverSelectionTimeoutMS: 5000, // fail in 5s if can't reach DB
})
  .then(() => console.log(`Mongoose connected to ${dbURI}`))
  .catch(err => console.error('Mongoose connection error:', err));

mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

// graceful shutdown helper (optional, keep your existing handlers if needed)
const gracefulShutdown = (msg) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
  });
};

process.once('SIGUSR2', () => { gracefulShutdown('nodemon restart'); process.kill(process.pid, 'SIGUSR2'); });
process.on('SIGINT', () => { gracefulShutdown('app termination'); process.exit(0); });
process.on('SIGTERM', () => { gracefulShutdown('app shutdown'); process.exit(0); });

// import schemas after connecting module-wise
require('./travlr');
module.exports = mongoose;