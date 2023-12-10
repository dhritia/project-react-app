import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: String,
    email: String,
    lastname: String,
    workplace: String,
    accessKey: String,
    favCuisine: String,
    role: {
      type: String,
      enum: ["User", "Chef", "Moderator"],
      default: "User" },
  },
  { collection: "user" });
export default userSchema;