import mongoose from "mongoose";
import restaurantModel from "../models/restaurantModel.js";
import dotenv from "dotenv";
import { contactAdminMail, notifyAdminMail, suggestAdminMail } from "../mailServices/mail.js";
import reservationModel from '../models/reservationModel.js';

dotenv.config();

export const getAllReservations = async (req, res) => {
  const cities = await reservationModel.find({});
  res.status(200).json(cities);
};
