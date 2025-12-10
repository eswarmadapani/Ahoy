import express from 'express';
import authRoute from './routes/auth.route.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import messageRoute from './routes/message.route.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Parse JSON/urlencoded with higher limits to handle base64 images
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4173'],
  credentials: true,
}));

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

app.listen(PORT, () => {
  console.log('Server is running on port: ' + PORT);
  connectDB();
});
