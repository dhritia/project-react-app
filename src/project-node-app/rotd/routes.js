import * as dao from "./dao.js";
function RotdRoutes(app) {
  const fetchRotd = async (req, res) => {
    const rotd = await dao.fetchRotd();
    res.json(rotd);
  }
  const updateRotd = async (req, res) => {
    const { id } = req.params;
    const status = await dao.updateRotd(id, req.body);
    res.json(status);
  };
  app.get("/api/rotd", fetchRotd);
  app.put("/api/rotd/:id", updateRotd);
}
export default RotdRoutes;