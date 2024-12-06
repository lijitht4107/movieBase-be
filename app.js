import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import adminRouter from './routes/adminRouter.js';
import userRouter from './routes/userRouter.js';
import apiRouter from './routes/apiRouter.js';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 3001; // Default to 3001 if PORT is not set
const db = process.env.MONGODB_URL;

// Db connection
main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(db);
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173',"*"], // Adjust this according to your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));//for image showing


// Routes
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/api', apiRouter);

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Server start
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
