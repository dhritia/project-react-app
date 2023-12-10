import model from "./model.js";
export const createComment = (comment) => model.create(comment);
export const findCommentsByRecipe = (id) =>
  model.find({ recipeID: id });
export const findCommentsByUsername = (username) =>
  model.find({ username: username });
export const deleteComment = (id) => model.deleteOne({ commentID: id });