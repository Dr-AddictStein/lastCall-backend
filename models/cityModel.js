import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);


const city = mongoose.model("CityCollection", citySchema);

export default city;