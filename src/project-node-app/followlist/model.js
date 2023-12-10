import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("followlists", schema);
export default model;