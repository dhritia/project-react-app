import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    recipeID: String,
    img: String,
    title: String,
  },
  { collection: "rotd" });
export default userSchema;