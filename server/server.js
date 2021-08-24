import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import mongoose from "mongoose";
const morgan = require("morgan");
require("dotenv").config();

//Create express app
const app = express();

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

//Route
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

//Port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
