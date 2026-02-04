// app.js

const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const cors = require("cors");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const NotFoundError = require("./errors/not-found-err");

const app = express();
const { PORT = 3001 } = process.env;

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/", mainRouter);

// celebrate errors (validation)
app.use(errors());

// 404 for unknown routes -> pass to centralized handler
app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

// centralized error handler MUST be last
app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
