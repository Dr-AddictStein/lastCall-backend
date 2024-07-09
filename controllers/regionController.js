import mongoose from "mongoose";
import regionModel from "../models/regionModel.js";
import cityModel from "../models/cityModel.js";
import { createCity } from "./cityController.js";

export const getAllRegions = async (req, res) => {
  const regions = await regionModel.find({}).populate("cities");
  res.status(200).json(regions);
};
export const getSingleRegion = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID.!." });
  }
  const region = await regionModel.findById(id).populate("cities");

  if (region) {
    res.status(200).json(region);
  } else {
    return res.status(400).json({ error: "No Such Region Found.!." });
  }
};
export const createRegion = async (req, res) => {

  console.log("REGGGGG", req.body)
  try {
    const { name, cities } = req.body;



    for (let i = 0; i < cities.length; i++) {
      const city = {
        name: cities[i],
        region: req.body.name
      }

      const newCity = new cityModel(city);
      const savedCity = await newCity.save();


    }

    const newRegion = new regionModel({
      name,
      cities
    });

    await newRegion.save();

    res.status(201).json(newRegion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRegion = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID.!." });
  }
  const { name, cities } = req.body;



  const currCities = await cityModel.find({ region: req.body.name });
  console.log("UPREG", currCities)
  for (let i = 0; i < currCities.length; i++) {
    const deleteCity = await cityModel.findByIdAndDelete(currCities[i]._id);
  }


  for (let i = 0; i < cities.length; i++) {
    const city = {
      name: cities[i],
      region: req.body.name
    }

    const newCity = new cityModel(city);
    const savedCity = await newCity.save();


  }
  const region = await regionModel.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (region) {
    const toSend = await regionModel.findById(id);
    res.status(200).json(toSend);
  } else {
    return res.status(400).json({ error: "No Such Region Found.!." });
  }
};

export const deleteRegion = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID.!." });
  }

  const reg = await regionModel.findById(id);


  console.log("UPREGDEL", req.body)
  const currCities = await cityModel.find({ region: reg.name });
  for (let i = 0; i < currCities.length; i++) {
    const deleteCity = await cityModel.findByIdAndDelete(currCities[i]._id);
  }

  const region = await regionModel.findOneAndDelete({ _id: id });

  if (region) {
    res.status(200).json(region);
  } else {
    return res.status(400).json({ error: "No Such region Found.!." });
  }
};
