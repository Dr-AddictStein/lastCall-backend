import mongoose from "mongoose";
import regionModel from "../models/regionModel.js";
import City from "../models/cityModel.js";

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
  try {
    const { name, cityIds } = req.body;

    // Ensure cityIds is an array
    if (!Array.isArray(cityIds)) {
      return res.status(400).json({ error: "cityIds must be an array" });
    }

    // Validate if the provided city IDs exist in the database
    const cities = await City.find({ _id: { $in: cityIds } });

    if (cities.length !== cityIds.length) {
      return res.status(404).json({ error: "One or more cities not found" });
    }

    const newRegion = new regionModel({
      name,
      cities: cityIds,
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

  const region = await regionModel.findOneAndDelete({ _id: id });

  if (region) {
    res.status(200).json(region);
  } else {
    return res.status(400).json({ error: "No Such region Found.!." });
  }
};
