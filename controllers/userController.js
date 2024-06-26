import mongoose from "mongoose";
import { notifyRestaurantAdminMail } from "../mailServices/mail.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const singupUser = async (req, res) => {
  const { firstname, lastname, email, phone, password } = req.body;
  const role = "user";
  console.log("ZZZZZZZZZZZZ",req.body)
  try {
    const user = await userModel.signup(
        firstname,
        lastname,
        email,
        role,
        phone,
        password
    );

    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  const cities = await userModel.find({});
  res.status(200).json(cities);
};
export const getSingleUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID.!." });
  }
  const user = await userModel.findById(id);

  if (user) {
    res.status(200).json(user);
  } else {
    return res.status(400).json({ error: "No Such User Found.!." });
  }
};
export const createUser = async (req, res) => {
  console.log("REQ",req.body)
  try {
    const newUser = new userModel(req.body);
    const savedUser = await newUser.save();
    await notifyRestaurantAdminMail(req.body.firstname,req.body.email,req.body.password);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  console.log("HERIYE",req.body)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID.!." });
  }
  const user = await userModel.findOneAndUpdate({ _id: id }, { ...req.body });

  if (user) {
    const toSend = await userModel.findById(id);
    res.status(200).json(toSend);
  } else {
    return res.status(400).json({ error: "No Such User Found.!." });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID.!." });
  }

  const user = await userModel.findOneAndDelete({ _id: id });

  if (user) {
    res.status(200).json(user);
  } else {
    return res.status(400).json({ error: "No Such user Found.!." });
  }
};
