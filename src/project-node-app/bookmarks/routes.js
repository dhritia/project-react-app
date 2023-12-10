import * as dao from "./dao.js";
function BookmarksRoutes(app) {
  const createBookmark = async (req, res) => {
    const user = await dao.createBookmark(req.body);
    res.json(user);
  };
  const deleteBookmark = async (req, res) => {
    const status = await dao.deleteBookmark(req.params.recipeID);
    res.json(status);
  };
  const findBookmark = async (req, res) => {
    const bookmark = await dao.findBookmark(req.params.recipeID);
    if (bookmark.length === 0) {
      res.json({username: "", recipeID: 0, title: ""})
    }
    else {
      res.json(bookmark);
    }
  }
  const findAllBookmarks = async (req, res) => {
    const username = req.params.username;
    const users = await dao.findBookmarksByUsername(username);
    res.json(users);
  };
  app.post("/api/bookmarks", createBookmark);
  app.delete("/api/bookmarks/:recipeID", deleteBookmark);
  app.get("/api/bookmarks/:recipeID", findBookmark);
  app.get("/api/bookmarks/get/:username", findAllBookmarks);
}
export default BookmarksRoutes;