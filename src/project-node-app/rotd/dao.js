import model from "./model.js";
export const fetchRotd = () => model.find();
export const updateRotd = (id, recipe) =>
  model.updateOne({ _id: id }, { $set: recipe });