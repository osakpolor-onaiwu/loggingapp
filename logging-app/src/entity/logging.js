const mongoose = require('mongoose');


// Define the schema
const loggingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed, // Allows storing any type of data
    required: true,
  },
  app_id: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create the model
const Logging = mongoose.model('Logging', loggingSchema);

module.exports = Logging;