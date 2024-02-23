// logger.js

const winston = require('winston');

// Define the logger configuration
const logger = winston.createLogger({
  level: 'info', // Log only 'info' level and above
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: 'errors.log', level: 'error' }) ,
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

module.exports = logger;
