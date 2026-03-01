import mongoose, { ObjectId, Schema } from "mongoose";

export interface LoggingSchema {
  _id?: ObjectId; // Optional, as MongoDB will automatically generate this
  key: string;
  data: any; // Can be of any type
  type: 'info' | 'error' | 'debug' | 'warn'; // Log level
  app_id: string; // Identifier for the application generating the log
  createdAt?: Date; // Automatically added by Mongoose
  updatedAt?: Date; // Automatically added by Mongoose,
  expiresAt?: Date; // Optional field for TTL index
}

// Define the schema
const loggingSchema: Schema<LoggingSchema> = new Schema({
  key: {
    type: String,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed, // Allows storing any type of data
    required: true,
  },
  type:{
    type: String,
    enum: ['info', 'error', 'debug', 'warn'],
    default: 'info'
  },
  app_id: {
    type: String,
    required: true,
  },
  expiresAt: { type: Date, expires: '1h', default: Date.now }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

loggingSchema.index({ key: 1, app_id: 1, type: 1 }); // Create an index on key and app_id for faster queries
// Create the model
const Logging = mongoose.model('Logging', loggingSchema);

export default Logging;