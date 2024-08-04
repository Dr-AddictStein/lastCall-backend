// stripe.js
import express from 'express';
import Stripe from 'stripe';
import reservationModel from '../models/reservationModel.js';
import restaurantModel from "../models/restaurantModel.js";
import restaurant from '../models/restaurantModel.js';

const router = express.Router();
const stripe = new Stripe('sk_test_51PjrgT2MktoZh11i373BEtLa1QJAHlw164OJubf7jOHtgbfnlpLeYdwn4mDS9CKNISMIU4SiIuvlcNBAi4TCzHs700JIXyB83J');

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
