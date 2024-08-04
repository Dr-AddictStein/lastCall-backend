import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    restaurant:{
        type: Object,
    },
    reservedFor:{
        type:String,
    },
    reservedForMail:{
        type:String,
    },
    reservedForPhone:{
        type:String,
    },
    tableType:{
        type:String,
    },
    time:{
        type:String,
    },
    date:{
        type:String
    },
    people:{
        type:String
    },
    leaveReview:{
        type: Boolean
    }
  },
  { timestamps: true }
);


const reservation = mongoose.model("ReservationCollection", reservationSchema);

export default reservation;