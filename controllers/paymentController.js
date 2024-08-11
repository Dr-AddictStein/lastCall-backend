// stripe.js
import express from 'express';
import Stripe from 'stripe';
import reservationModel from '../models/reservationModel.js';
import restaurantModel from "../models/restaurantModel.js";
import restaurant from '../models/restaurantModel.js';
import { notifyBookerMail, notifyBookingAdminMail } from '../mailServices/mail.js';

const router = express.Router();
const stripe = new Stripe('sk_test_51Pb6MZRqpEIBbqVXD8AaE8G3z65hOxYP908oVaun7IGx5SSZqAfvlrzgiOtsp1k8ySo7mqofnx9vD4mobGoXns8E00rgL7qlVU');


function reduceSingleNumberString(str) {
  let number = parseInt(str.trim());
  let reducedNumber = number - 1;
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


router.post('/create-checkout-session', async (req, res) => {
  console.log("Reached Hua: ", req.body)
  const restu = await restaurantModel.findById(req.body.restaurant);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Booking at ${restu.name}`,
          },
          unit_amount: req.body.cost*100, // Amount in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:5173/profile/upcomingbookings`,
    cancel_url: `http://localhost:5173/foodDetails/${req.body.restaurant}`,
  });


  const resv = new reservationModel({
    ...req.body,
    restaurant: restu
  });
  const savedResv = await resv.save();
  
  let dex = restu;

  for(let i=0;i<dex.tables.length;i++){
    if(convertToAbbreviatedMonthName(dex.tables[i].date)==="Thu Aug 15 2024"){
      if(savedResv.tableType==="Breakfast"){
        dex.tables[i].breakfast.accomodations = reduceSingleNumberString(dex.tables[i].breakfast.accomodations);
      }
      else if(savedResv.tableType==="Lunch"){
        dex.tables[i].lunch.accomodations = reduceSingleNumberString(dex.tables[i].lunch.accomodations);
      }
      else if(savedResv.tableType==="Dinner First Call"){
        dex.tables[i].dinnerfirstcall.accomodations = reduceSingleNumberString(dex.tables[i].dinnerfirstcall.accomodations);
      }
      else if(savedResv.tableType==="Dinner Last Call"){
        dex.tables[i].dinnerlastcall.accomodations = reduceSingleNumberString(dex.tables[i].dinnerlastcall.accomodations);
      }
      break;
    }
  }

  await restaurantModel.findByIdAndUpdate({_id:req.body.restaurant},{...dex});




  res.json({ id: session.id, reservation: savedResv });
  await notifyBookerMail(savedResv);
  await notifyBookingAdminMail(process.env.SUPER_ADMIN_MAIL, savedResv);
});

export default router;
