// backend/server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
