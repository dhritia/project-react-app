import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("bookmarks", schema);
export default model;