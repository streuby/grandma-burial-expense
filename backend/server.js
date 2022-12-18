import path from "path";
import express from "express";
import dotenv from "dotenv";
//import colors from "colors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import photocardRoutes from "./routes/photocardsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

console.log("Checking .env: ", process.env.NODE_ENV);

app.use(express.json());

app.use("/api/photocards", photocardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/uploads", uploadRoutes);

app.get("/api/config/:gateway", (req, res) => {
  if (req.params.gateway === "paystack") {
    res.send(process.env.PAYSTACK_PUBLIC_KEY);
  } else if (req.params.gateway === "paypal") {
    res.send(process.env.PAYPAL_CLIENT_ID);
  }
});

const __dirname = path.resolve();

// Deployment configuration
if (process.env.NODE_ENV === "photocardion") {
  app.use(express.static(path.join(__dirname, "frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  // Only required at development environment
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(
  "uploads",
  express.static(path.join(__dirname, "/frontend/public/images"))
);

app.use(notFound);

app.use(errorHandler);

// app.get("/api/photocards", (req, res) => {
//   res.json(photocards);
// });

// app.get("/api/photocards/:id", (req, res) => {
//   const photocard = photocards.find((p) => p._id === req.params.id);
//   res.json(photocard);
// });

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
