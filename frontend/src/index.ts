import mongoose from 'mongoose';
import { config } from 'dotenv';

config(); // Load environment variables from .env file

const mongodbURI = process.env.MONGODB_URI || '';

mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

export default mongoose;
