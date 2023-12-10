import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: String,
    recipeID: Number,
    comment: String,
    commentID: String,
    role: {
        type: String,
        enum: ["User", "Chef", "Moderator"],
        default: "User" },
    title: String,
  },
  { collection: "comments" });
export default userSchema;