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

function reduceSingleNumberString(str) {
  let number = parseInt(str.trim());
  let reducedNumber = number + 1;
  return reducedNumber.toString();
}


function convertToAbbreviatedMonthName(dateStr) {
  // Split the input string into its parts
  let [dayOfWeek, day, fullMonth, year] = dateStr.split(' ');

  // Define an object mapping full month names to their abbreviations
  let monthAbbreviations = {
      "January": "Jan",
      "February": "Feb",
      "March": "Mar",
      "April": "Apr",
      "May": "May",
      "June": "Jun",
      "July": "Jul",
      "August": "Aug",
      "September": "Sep",
      "October": "Oct",
      "November": "Nov",
      "December": "Dec"
  };

  // Get the abbreviated month name
  let abbreviatedMonth = monthAbbreviations[fullMonth];

  // Format the final string
  return `${dayOfWeek} ${abbreviatedMonth} ${day} ${year}`;
}


export const cancelReservation = async(req,res)=>{
  const {id} = req.params;
  const resv = await reservationModel.findById(id);

  const restu = await restaurantModel.findById(resv.restaurant._id);

  let dex = restu;

  for(let i=0;i<dex.tables.length;i++){
    if(convertToAbbreviatedMonthName(dex.tables[i].date)===resv.date){
      if(resv.tableType==="Breakfast"){
        dex.tables[i].breakfast.accomodations = reduceSingleNumberString(dex.tables[i].breakfast.accomodations);
      }
      else if(resv.tableType==="Lunch"){
        dex.tables[i].lunch.accomodations = reduceSingleNumberString(dex.tables[i].lunch.accomodations);
      }
      else if(resv.tableType==="Dinner First Call"){
        dex.tables[i].dinnerfirstcall.accomodations = reduceSingleNumberString(dex.tables[i].dinnerfirstcall.accomodations);
      }
      else if(resv.tableType==="Dinner Last Call"){
        dex.tables[i].dinnerlastcall.accomodations = reduceSingleNumberString(dex.tables[i].dinnerlastcall.accomodations);
      }
      break;
    }
  }

  await restaurantModel.findByIdAndUpdate({_id:resv.restaurant._id},{...dex});

  await cancelReservationMailToAdmin(process.env.SUPER_ADMIN_MAIL,resv);

  await reservationModel.findByIdAndDelete(id);
  return res.status(200).json(resv);
}