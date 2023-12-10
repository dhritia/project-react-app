import * as dao from "./dao.js";
function FollowRoutes(app) {
  const createFollower = async (req, res) => {
    const user = await dao.createFollower(req.body);
    res.json(user);
  };
  const deleteFollower = async (req, res) => {
    const status = await dao.deleteFollower(req.params.followID);
    res.json(status);
  };
  const findAllFollowers = async (req, res) => {
    const username = req.params.username;
    const users = await dao.findFollowersByUsername(username);
    res.json(users);
  };
  const findAllFollowing = async (req, res) => {
    const username = req.params.username;
    const users = await dao.findFollowingByUsername(username);
    res.json(users);
  };
  const findFollower = async (req, res) => {
    const user = await dao.findFollower(req.params.followID);
    res.json(user);
  };
  app.post("/api/followlist", createFollower);
  app.delete("/api/followlist/:followID", deleteFollower);
  app.get("/api/followlist/followers/:username", findAllFollowers);
  app.get("/api/followlist/following/:username", findAllFollowing);
  app.get("/api/followlist/:followID", findFollower);
}
export default FollowRoutes;
