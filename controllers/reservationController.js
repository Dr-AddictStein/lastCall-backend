import mongoose from "mongoose";
import restaurantModel from "../models/restaurantModel.js";
import dotenv from "dotenv";
import { cancelReservationMailToAdmin, contactAdminMail, notifyAdminMail, suggestAdminMail } from "../mailServices/mail.js";
import reservationModel from '../models/reservationModel.js';

dotenv.config();

export const getAllReservations = async (req, res) => {
  const cities = await reservationModel.find({});
  return res.status(200).json(cities);
};


export const cancelReservation = async(req,res)=>{
  const {id} = req.params;
  const resv = await reservationModel.findById(id);

  await cancelReservationMailToAdmin(process.env.SUPER_ADMIN_MAIL,resv);

  await reservationModel.findByIdAndDelete(id);
  return res.status(200).json(resv);
}