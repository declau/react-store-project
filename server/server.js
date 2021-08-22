import express from "express";
import cors from "cors";
const morgan = require("morgan");
require("dotenv").config();

//Create express app
const app = express();

// Add middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log("Middleware working...");
  next();
});

// route
app.get("/", (req, res) => {
  res.send("hit server endpoint");
});

//Port
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
