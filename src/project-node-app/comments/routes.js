import * as dao from "./dao.js";
function CommentRoutes(app) {
  const createComment = async (req, res) => {
    const user = await dao.createComment(req.body);
    res.json(user);
  };
  const deleteComment = async (req, res) => {
    const status = await dao.deleteComment(req.params.commentID);
    res.json(status);
  };
  const findAllCommentsbyUsername = async (req, res) => {
    const username = req.params.username;
    const comments = await dao.findCommentsByUsername(username);
    res.json(comments);
  };
  const findAllCommentsbyID = async (req, res) => {
    const id = req.params.recipeID;
    const comments = await dao.findCommentsByRecipe(id);
    res.json(comments);
  };
  app.post("/api/comments", createComment);
  app.delete("/api/comments/:commentID", deleteComment);
  app.get("/api/comments/get/:username", findAllCommentsbyUsername);
  app.get("/api/comments/:recipeID", findAllCommentsbyID);
}

export default CommentRoutes;