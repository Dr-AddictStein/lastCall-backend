import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        ownerfirstname: {
            type: String,
            required: true,
        },
        ownerlastname: {
            type: String,
            //   required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            //   required: true,
        },
        city: {
            type: String,
            required: true,
        },
        region: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            // required: true,
        },
        thumb: {
            type: String,
            // required: true,
        },
    },
    { timestamps: true }
);


const restaurant = mongoose.model("RestaurantCollection", restaurantSchema);

export default restaurant;