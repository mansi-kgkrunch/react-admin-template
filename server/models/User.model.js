import "dotenv/config";
import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    images: 
      {
        name: String,
        path: String,
      },
  },
  {
    collection: "users",
  }
);

const model = mongoose.model("users", User);

export default model;
