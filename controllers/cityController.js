import mongoose from "mongoose";
import cityModel from "../models/cityModel.js";
import regionModel from "../models/regionModel.js";

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

  const data = {
    name: req.body.name,
    region: req.body.region,
    image: req.body.image
  };


  try {
    const reg = await regionModel.find({ name: req.body.region });
    const regCities = reg[0].cities;

    let dex = regCities;
    dex.push(data.name);

    console.log("AP", dex)

    const region = await regionModel.findOneAndUpdate(
      {
        _id: reg[0]._id
      },
      {
        name: reg[0].name,
        cities: dex
      }
    )

    const newCity = new cityModel(data);
    const savedCity = await newCity.save();
    res.status(201).json(savedCity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCity = async (req, res) => {
  console.log("HEREFROMREGIONCREATIONB", req.body)
  const { id } = req.params;

  const oldName = await cityModel.findById(id);
  const prevCity = oldName.name;

  const reg = await regionModel.find({ name: req.body.region });
  const regCities = reg[0].cities;

  let dex=[];

  for(let i=0;i<regCities.length;i++){
    if(regCities[i]===prevCity){
      dex.push(req.body.name);
    }
    else{
      dex.push(regCities[i]);
    }
  }

  const region = await regionModel.findOneAndUpdate(
    {
      _id: reg[0]._id
    },
    {
      name: reg[0].name,
      cities: dex
    }
  )


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
  
  const getCity = await cityModel.findById(id);

  const reg = await regionModel.find({ name: getCity.region });
  const regCities = reg[0].cities;

  let dex=[];

  for(let i=0;i<regCities.length;i++){
    if(regCities[i]===getCity.name){
      
    }
    else{
      dex.push(regCities[i]);
    }
  }

  const region = await regionModel.findOneAndUpdate(
    {
      _id: reg[0]._id
    },
    {
      name: reg[0].name,
      cities: dex
    }
  )
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
