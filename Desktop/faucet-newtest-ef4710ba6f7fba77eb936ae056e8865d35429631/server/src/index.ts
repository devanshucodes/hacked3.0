import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import claimRoutes from './routes/claimRoutes';

// Load environment variables BEFORE using them
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// More detailed MongoDB connection
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    console.log('Connection string:', process.env.MONGODB_URI);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Disable MongoDB query logging
// mongoose.set('debug', true);

app.use('/api/claims', claimRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 