// @ts-nocheck
import dotenv from "dotenv";

import express from "express";

import cors from "cors";

import helmet from "helmet";

import morgan from "morgan";

import rateLimit from "express-rate-limit";

import { supabase } from "./config/supabase";

import authRoutes from "./routes/auth.routes";

import testRoutes from "./routes/test.routes";

import businessRoutes from './routes/business.routes';
import requirementRoutes from './routes/requirement.routes';
import advertisementRoutes from './routes/advertisement.routes';
import productRoutes from './routes/product.routes';
import notificationRoutes from './routes/notifications.routes';
import systemRoutes from './routes/system.routes';
import adminRoutes from './routes/admin.routes';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

/* SECURITY */
app.use(helmet());

/* CORS */
app.use(
  cors({
    origin: "*",
  })
);

/* RATE LIMIT */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 5000,
});

app.use(limiter);

/* MIDDLEWARE */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(morgan("dev"));

app.use(
  "/api/business",
  businessRoutes
);

/* TEST ROUTE */
app.get("/", (req, res) => {

  res.json({

    success: true,

    message:
      "Mandar Backend Running Successfully",
  });

});

app.use('/api/auth', authRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/requirements', requirementRoutes);
app.use('/api/advertisements', advertisementRoutes);
app.use('/api/products', productRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/system', systemRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chats', require('./routes/chat.routes').default);

/* SERVER */
app.get('/api/health', (req, res) => res.status(200).send('OK'));

app.listen(PORT as number, '0.0.0.0', () => {

  console.log(
    `Server running on port ${PORT}`
  );

});