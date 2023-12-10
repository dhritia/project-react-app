import model from "./model.js";
export const createBookmark = (bookmark) => model.create(bookmark);
export const findBookmark = (id) => model.find({recipeID: id});
export const findBookmarksByUsername = (username) =>
  model.find({ username: username });
export const deleteBookmark = (id) => model.deleteOne({ recipeID: id });