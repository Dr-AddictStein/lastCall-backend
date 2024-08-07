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
        banner:{
            type: String,
        },
        image1:{
            type: String,
        },
        image2:{
            type: String,
        },
        image3:{
            type: String,
        },
        image4:{
            type: String,
        },
        operatinghours:[String],
        specialconditions:[String],
        description:{
            type: String,
        },
        category:[String],
        tables:[
            {
                date:{
                    type: String,
                },
                isclosed:{
                    type: Boolean
                },
                breakfast:{
                    starts:{
                        type: String,
                    },
                    accomodations:{
                        type: String,
                    },
                },
                lunch:{
                    starts:{
                        type: String,
                    },
                    accomodations:{
                        type: String,
                    },
                },
                dinnerfirstcall:{
                    starts:{
                        type: String,
                    },
                    accomodations:{
                        type: String,
                    },
                },
                dinnerlastcall:{
                    starts:{
                        type: String,
                    },
                    accomodations:{
                        type: String,
                    },
                },
            }
        ]
    },
    { timestamps: true }
);


const restaurant = mongoose.model("RestaurantCollection", restaurantSchema);

export default restaurant;