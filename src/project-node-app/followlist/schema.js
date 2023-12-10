import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    followID: String,
    username1: String,
    name: String,
    username2: String,
    name2: String,
  },
  { collection: "followlists" });
export default userSchema;