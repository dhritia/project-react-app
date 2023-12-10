import model from "./model.js";
export const createFollower = (user) => model.create(user);
export const findFollowersByUsername = (username) =>
  model.find({ username2: username });
export const findFollowingByUsername = (username) =>
  model.find({ username1: username });
export const deleteFollower = (id) => model.deleteOne({ followID: id });
export const findFollower = (id) => model.findOne({followID: id});