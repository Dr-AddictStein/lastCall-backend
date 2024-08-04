// stripe.js
import express from 'express';
import Stripe from 'stripe';
import reservationModel from '../models/reservationModel.js';
import restaurantModel from "../models/restaurantModel.js";
import restaurant from '../models/restaurantModel.js';

const router = express.Router();
const stripe = new Stripe('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');

router.post('/create-checkout-session', async (req, res) => {
    console.log("Reached: ",req.body)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
            images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/1200px-Flag_of_Bangladesh.svg.png"],
          },
          unit_amount: 1000, // Amount in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:5173/foodDetails/${req.body.restaurant}`,
    cancel_url: `http://localhost:5173/foodDetails/${req.body.restaurant}`,
  });

  const restu = await restaurantModel.findById(req.body.restaurant);

  const resv=new reservationModel({
    ...req.body,
    restaurant:restu
});
  const savedResv=await resv.save();

  res.json({ id: session.id, reservation: savedResv });
});

export default router;
