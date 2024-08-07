import express from "express";
import dotenv from "dotenv";
import mongoose, { connect } from "mongoose";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import cityRoutes from "./routes/cityRoutes.js";
import regionRoutes from "./routes/regionRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import paymentIntegration from './controllers/paymentController.js';

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




// user
app.use("/api/user", userRoutes);

// city
app.use("/api/city", cityRoutes);

// region
app.use("/api/region", regionRoutes);

// restaurant
app.use("/api/restaurant", restaurantRoutes);

// reservation
app.use("/api/reservation", reservationRoutes);

//file
app.use("/api/file",fileRoutes);


//payment
app.use("/api",paymentIntegration);




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
