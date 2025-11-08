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


app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5176',
  credentials: true,
}));

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

app.listen(PORT, () => {
  console.log('Server is running on port: ' + PORT);
  connectDB();
});
