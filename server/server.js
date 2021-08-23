import express from "express";
import cors from "cors";
// const cors = require("cors");
import { readdirSync } from "fs";
import mongoose from "mongoose";
const morgan = require("morgan");
require("dotenv").config();

//Create express app
const app = express();

//Route
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

// database connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("**DB Connected**"))
  .catch("error", (err) => {
    console.log(`DB connection error: ${err.message}`);
  });

// Add middleware
const origin = {
  origin: "*",
};
app.use(cors(origin));
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log("Middleware working...");
  next();
});

//Port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
