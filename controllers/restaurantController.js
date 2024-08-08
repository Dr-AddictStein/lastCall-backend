import mongoose from "mongoose";
import restaurantModel from "../models/restaurantModel.js";
import dotenv from "dotenv";
import { contactAdminMail, notifyAdminMail, suggestAdminMail } from "../mailServices/mail.js";
import reservationModel from '../models/reservationModel.js';

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
    return res.status(200).json(restaurant);
  } else {
    return res.status(400).json({ error: "No Such Restaurant Found.!." });
  }
};
export const getReservations = async (req, res) => {
  const { email } = req.params;

  try {
    const restaurant = await restaurantModel.findOne({ email: email });
    if (!restaurant) {
      return res.status(404).json({ error: "No Such Restaurant Found." });
    }

    const resvs = await reservationModel.find({});
    const dex = resvs.filter((resv) => {
      return String(resv.restaurant._id) === String(restaurant._id);
    });

    console.log("Filtered Reservations:", dex);

    return res.status(200).json(dex);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
export const getAllReservations = async (req, res) => {
  const cities = await reservationModel.find({});
  res.status(200).json(cities);
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
export const contactAdmin = async (req, res) => {
  const data = req.body;
  await contactAdminMail(process.env.SUPER_ADMIN_MAIL, data);
  res.status(200).json({ message: "Mail has been sent to SUper Admin Successfully.!." });
}
export const suggestAdmin = async (req, res) => {
  const data = req.body;
  await suggestAdminMail(process.env.SUPER_ADMIN_MAIL, data);
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



// New controller to add tables for all specific weekdays for the next 3 years
export const addWeekdayTables = async (req, res) => {
  const { id } = req.params;
  const { isclosed, breakfast, lunch, dinnerfirstcall, dinnerlastcall, dayOfWeek } = req.body;
  const prevRest = await restaurantModel.findById(id);

  let dex = prevRest;

  const weekdays = getAllWeekdays(dayOfWeek);

  weekdays.forEach(day => {
    const formattedDate = day.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' });
    let found = false;
    for (let i = 0; i < dex.tables.length; i++) {
      if (dex.tables[i].date === formattedDate) {
        found = true;
        dex.tables[i] = { date: formattedDate, isclosed, breakfast, lunch, dinnerfirstcall, dinnerlastcall };
        break;
      }
    }

    if (!found) {
      dex.tables.push({ date: formattedDate, isclosed, breakfast, lunch, dinnerfirstcall, dinnerlastcall });
    }
  });

  console.log("UPDATED WEEKDAYS.!.!.!.", dex);

  const restaurant = await restaurantModel.findOneAndUpdate(
    {
      _id: id
    },
    {
      ...dex
    }
  );

  if (restaurant) {
    const toSend = await restaurantModel.findById(dex._id);
    res.status(200).json(toSend);
  } else {
    return res.status(400).json({ error: "No Such Restaurant Found.!." });
  }
}

// Helper function to get all specific weekdays for the next 3 years
const getAllWeekdays = (dayOfWeek) => {
  const weekdays = [];
  const currentDate = new Date();
  const endDate = new Date(currentDate.getFullYear() + 3, currentDate.getMonth(), currentDate.getDate());

  // Convert dayOfWeek to corresponding integer (0 for Sunday, 1 for Monday, etc.)
  const dayOfWeekMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const dayOfWeekInt = dayOfWeekMap[dayOfWeek];

  // Find the next occurrence of the specified dayOfWeek
  while (currentDate.getDay() !== dayOfWeekInt) {
    currentDate.setDate(currentDate.getDate() + 1);
  }

  while (currentDate <= endDate) {
    weekdays.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 7);
  }

  console.log("ZsP", weekdays);
  return weekdays;
};