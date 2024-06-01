import express from "express";
import dotenv from "dotenv";
import mongoose, { connect } from "mongoose";
import cors from "cors";

dotenv.config();

// creates express app
const app = express();

// use of middlewars
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    console.log("Successfully Connected to DB");
    app.listen(process.env.PORT, () => {
      console.log(`Listening on PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
