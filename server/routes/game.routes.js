const gameCtrl = require("../controllers/game.controller");
module.exports = (app) => {
  app.get("/api/healthcheck", gameCtrl.healthcheck);
  app.post("/api/game", gameCtrl.addNewGame);
  app.get("/api/game", gameCtrl.getAllGames);
  app.get("/api/game/:id", gameCtrl.getGameById);
  app.delete("/api/game/:id", gameCtrl.deleteGame);
  app.put("/api/game/:id", gameCtrl.updateGame);
};
