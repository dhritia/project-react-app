import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const USERS_API = `${BASE_API}/users`;
export const BOOKMARK_API = `${BASE_API}/bookmarks`;
export const COMMENT_API = `${BASE_API}/comments`;
export const FOLLOW_API = `${BASE_API}/followlist`;
export const ROTD_API = `${BASE_API}/rotd`;
const request = axios.create({
  withCredentials: true,
});
export const signin = async (credentials) => {
  const response = await request.post( `${USERS_API}/signin`, credentials );
  return response.data;
};
export const updateUser = async (user) => {
  const response = await request.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};
export const signout = async () => {
  const response = await request.post(`${USERS_API}/signout`);
  return response.data;
};
export const account = async () => {
    const response = await request.post(`${USERS_API}/account`);
    return response.data;
};
export const accounts = async () => {
  const response = await request.get(`${USERS_API}`);
  return response.data;
};
export const getAccount = async (username) => {
  const response = await request.get(`${USERS_API}/${username}`);
  return response.data;
}
export const signup = async (credentials) => {
  const response = await request.post(
    `${USERS_API}/signup`, credentials);
  return response.data;
};
export const deleteUser = async (user) => {
  const response = await request.delete(
    `${USERS_API}/${user._id}`);
  return response.data;
};
export const addBookmark = async(bookmark) => {
  const response = await request.post(`${BOOKMARK_API}`, bookmark);
  return response.data;
};
export const fetchBookmark = async(recipeID) => {
  const response = await request.get(`${BOOKMARK_API}/${recipeID}`);
  return response.data;
};
export const bookmarks = async(username) => {
  const response = await request.get(`${BOOKMARK_API}/get/${username}`);
  return response.data;
};
export const deleteBookmark = async(recipeID) => {
  const response = await request.delete(`${BOOKMARK_API}/${recipeID}`);
  return response.status;
};
export const comments = async(recipeID) => {
  const response = await request.get(`${COMMENT_API}/${recipeID}`);
  return response.data;
};
export const addComment = async(comment) => {
  const response = await request.post(`${COMMENT_API}`, comment);
  return response.data;
};
export const findComments = async(id) => {
  const response = await request.get(`${COMMENT_API}/get/${id}`);
  return response.data;
}
export const deleteComment = async(id) => {
  const response = await request.delete(`${COMMENT_API}/${id}`);
  return response.status;
};
export const addFollower = async(follow) => {
  const response = await request.post(`${FOLLOW_API}`, follow);
  return response.data;
};
export const findFollower = async(id) => {
  const response = await request.get(`${FOLLOW_API}/${id}`);
  return response.data;
};
export const findFollowers = async(id) => {
  const response = await request.get(`${FOLLOW_API}/followers/${id}`);
  return response.data;
};
export const findFollowing = async(id) => {
  const response = await request.get(`${FOLLOW_API}/following/${id}`);
  return response.data;
};
export const deleteFollower = async(id) => {
  const response = await request.delete(`${FOLLOW_API}/${id}`);
  return response.status;
};
export const fetchRotd = async() => {
  const response = await request.get(`${ROTD_API}`);
  return response.data;
}
export const updateRotd = async (rotd, id) => {
  const response = await request.put(`${ROTD_API}/${id}`, rotd);
  return response.data;
};