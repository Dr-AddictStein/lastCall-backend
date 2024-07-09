import mongoose from "mongoose";
import cityModel from "../models/cityModel.js";

export const getAllCities = async (req, res) => {
  const cities = await cityModel.find({});
  res.status(200).json(cities);
};
export const getSingleCity = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID.!." });
  }
  const city = await cityModel.findById(id);

  if (city) {
    res.status(200).json(city);
  } else {
    return res.status(400).json({ error: "No Such City Found.!." });
  }
};
export const createCity = async (req, res) => {
  console.log("HEREFROMREGIONCREATIONB",req.body)
  try {
    const newCity = new cityModel(req.body);
    const savedCity = await newCity.save();
    res.status(201).json(savedCity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCity = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID.!." });
  }
  const city = await cityModel.findOneAndUpdate({ _id: id }, { ...req.body });

  if (city) {
    const toSend = await cityModel.findById(id);
    res.status(200).json(toSend);
  } else {
    return res.status(400).json({ error: "No Such City Found.!." });
  }
};

export const deleteCity = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID.!." });
  }

  const city = await cityModel.findOneAndDelete({ _id: id });

  if (city) {
    res.status(200).json(city);
  } else {
    return res.status(400).json({ error: "No Such city Found.!." });
  }
};
