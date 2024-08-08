// stripe.js
import express from 'express';
import Stripe from 'stripe';
import reservationModel from '../models/reservationModel.js';
import restaurantModel from "../models/restaurantModel.js";
import restaurant from '../models/restaurantModel.js';
import { notifyBookerMail, notifyBookingAdminMail } from '../mailServices/mail.js';

const router = express.Router();
const stripe = new Stripe('sk_test_51Pb6MZRqpEIBbqVXD8AaE8G3z65hOxYP908oVaun7IGx5SSZqAfvlrzgiOtsp1k8ySo7mqofnx9vD4mobGoXns8E00rgL7qlVU');

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
    success_url: `http://localhost:5173/foodDetails/${req.body.restaurant}`,
    cancel_url: `http://localhost:5173/foodDetails/${req.body.restaurant}`,
  });


  const resv = new reservationModel({
    ...req.body,
    restaurant: restu
  });
  const savedResv = await resv.save();


  res.json({ id: session.id, reservation: savedResv });
  await notifyBookerMail(savedResv);
  await notifyBookingAdminMail(process.env.SUPER_ADMIN_MAIL, savedResv);
});

export default router;
