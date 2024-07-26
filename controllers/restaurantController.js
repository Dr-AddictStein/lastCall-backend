import mongoose from "mongoose";
import restaurantModel from "../models/restaurantModel.js";
import dotenv from "dotenv";
import { notifyAdminMail } from "../mailServices/mail.js";

dotenv.config();

export const getAllRestaurants = async (req, res) => {
  const cities = await restaurantModel.find({});
  res.status(200).json(cities);
};
export const getSingleRestaurant = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID.!." });
  }
  const restaurant = await restaurantModel.findById(id);

  if (restaurant) {
    res.status(200).json(restaurant);
  } else {
    return res.status(400).json({ error: "No Such Restaurant Found.!." });
  }
};
export const getSingleRestaurantByOwnerEmail = async (req, res) => {
  const { email } = req.params;

  const restaurant = await restaurantModel.findOne({ email: email });;

  if (restaurant) {
    res.status(200).json(restaurant);
  } else {
    return res.status(400).json({ error: "No Such Restaurant Found.!." });
  }
};
export const createRestaurant = async (req, res) => {
  try {
    const newRestaurant = new restaurantModel(req.body);
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRestaurant = async (req, res) => {
  const { id } = req.params;


  console.log("REsUPDATE", req.body);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID.!." });
  }
  const restaurant = await restaurantModel.findOneAndUpdate({ _id: id }, { ...req.body });

  if (restaurant) {
    console.log("UPDATED.!.!.!.", restaurant);
    const toSend = await restaurantModel.findById(id);
    res.status(200).json(toSend);
  } else {
    return res.status(400).json({ error: "No Such Restaurant Found.!." });
  }
};

export const deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID.!." });
  }

  const restaurant = await restaurantModel.findOneAndDelete({ _id: id });

  if (restaurant) {
    res.status(200).json(restaurant);
  } else {
    return res.status(400).json({ error: "No Such restaurant Found.!." });
  }
};

export const notifyAdmin = async (req, res) => {
  const data = req.body;
  await notifyAdminMail(process.env.SUPER_ADMIN_MAIL, data);
  res.status(200).json({ message: "Mail has been sent to SUper Admin Successfully.!." });
}


export const addTable = async (req, res) => {
  const { id } = req.params;
  const prevRest = await restaurantModel.findById(id);

  let dex = prevRest;

  let found = false;
  for (let i = 0; i < dex.tables.length; i++) {
    if (dex.tables[i].date === req.body.date) {
      found = true;
      dex.tables[i] = req.body;
      break;
    }
  }

  if (!found) {
    dex.tables.push(req.body);
  }
  console.log("UPDATED.!.!.!.", dex);

  const restaurant = await restaurantModel.findOneAndUpdate(
    {
      _id: id
    },
    {
      ...dex
    }
  )

  if (restaurant) {
    const toSend = await restaurantModel.findById(dex._id);
    res.status(200).json(toSend);
  } else {
    return res.status(400).json({ error: "No Such Restaurant Found.!." });
  }

}


export const deleteTable = async (req, res) => {
  const { id } = req.params;
  const prevRest = await restaurantModel.findById(id);

  let dex = prevRest;

  let tex=[]

  for (let i = 0; i < dex.tables.length; i++) {
    if (dex.tables[i].date !== req.body.data.date) {
      tex.push(dex.tables[i]);
    }
  }

  dex.tables=tex;


  console.log("Dateo.!.!.!.", req.body);
  console.log("UPDATED.!.!.!.", tex);

  const restaurant = await restaurantModel.findOneAndUpdate(
    {
      _id: id
    },
    {
      ...dex
    }
  )

  if (restaurant) {
    const toSend = await restaurantModel.findById(dex._id);
    res.status(200).json(toSend);
  } else {
    return res.status(400).json({ error: "No Such Restaurant Found.!." });
  }

}