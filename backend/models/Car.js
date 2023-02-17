import mongoose from "mongoose";
const CarSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
      minLength: [3, "Title must be at least 3 characters long!"],
    },
    price: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      minLength: [11, "number must be at least 11 characters long!"],
      minLength: [11, "number can not longer then 11 characters!"]
    },
    city: {
      type: String,
      required: true,
      enum: ['lahore','karachi'],
    },
    totalphotos:{
        type: Number,
        required: true,
        minLength: [1, "one picture must to be add"],
        maxLength: [10, "you can't add more then 10 pictures"]
    },
    photos: {
        type: [String],
        required: true,
      },
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
  },
  { timestamps: true }
);

export default mongoose.model("Car", CarSchema);