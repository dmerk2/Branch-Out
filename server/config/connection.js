const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/branchout', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {

  // Dynamically import all model files
  const modelsPath = path.join(__dirname, '..', 'models');
  fs.readdirSync(modelsPath).forEach((file) => {
    if (file.endsWith('.js') && file !== 'index.js') {
      require(path.join(modelsPath, file));
    }
  });
});

module.exports = mongoose.connection;
