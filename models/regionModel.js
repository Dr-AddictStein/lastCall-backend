import mongoose from "mongoose";

const regionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CityCollection",
      },
    ],
  },
  { timestamps: true }
);

const region = mongoose.model("RegionCollection", regionSchema);

export default region;
