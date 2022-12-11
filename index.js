import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postsRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

// general setup of body parser for sending proper requests (large images and ...)
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// set up routes
app.use("/posts", postsRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;
  
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Memoreis API");
});

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log("Server running on Port " + PORT));
  })
  .catch((error) => {
    console.log(error.message);
  });

// makes sure we don't get a warning in the console
// mongoose.set('userFindAndModify', false);
