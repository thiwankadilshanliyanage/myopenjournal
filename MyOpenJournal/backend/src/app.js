import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();

// ✅ Production-ready CORS
const allowedOrigins = [
  'http://localhost:5173',
  process.env.CLIENT_URL,
  'https://myopenjournal.netlify.app'
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      const isNetlifyPreview =
        origin.includes('--myopenjournal.netlify.app') ||
        origin.endsWith('.netlify.app');

      if (allowedOrigins.includes(origin) || isNetlifyPreview) {
        return callback(null, true);
      }

      console.log('Blocked by CORS:', origin);
      return callback(new Error(`CORS not allowed: ${origin}`));
    },
    credentials: true
  })
);
app.use(helmet());

app.use(express.json({
  limit: '10mb'
}));

app.use(express.urlencoded({
  extended: true,
  limit: '10mb'
}));

app.use(cookieParser());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(xss());
app.use(mongoSanitize());

// health route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'MyOpenJournal API is running 🚀'
  });
});

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/uploads', uploadRoutes);

// errors
app.use(notFound);
app.use(errorHandler);

export default app;