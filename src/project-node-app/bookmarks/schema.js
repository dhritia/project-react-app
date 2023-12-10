import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: String,
    recipeID: String,
    recipe: String,
    title: String,
  },
  { collection: "bookmarks" });
export default userSchema;