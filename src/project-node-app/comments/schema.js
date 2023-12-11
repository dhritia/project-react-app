import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: String,
    recipeID: Number,
    comment: String,
    commentID: String,
    role: String,
    title: String,
  },
  { collection: "comments" });
export default userSchema;
