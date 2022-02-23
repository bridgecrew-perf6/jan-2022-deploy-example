const Game = require("../models/game.model");

const healthcheck = (req, res) => {
  res.json({ msg: "ALL GOOD" });
};

// controller function to add new game doc to mongodb
const addNewGame = (req, res) => {
  console.log("gets here");
  const { body } = req;
  console.log(body);
  // add new game doc to Game collection
  Game.create(body)
    .then((newGameDoc) => {
      res.json({ newGameDoc });
    })
    .catch((err) => res.status(400).json({ err }));
};

// controll funciton to find all game docs from mongodb
const getAllGames = (req, res) => {
  Game.find()
    .then((allGames) => res.json(allGames))
    .catch((err) => res.status(400).json({ err }));
};

// controller function to find doc by id
const getGameById = (req, res) => {
  Game.findOne({ _id: req.params.id })
    .then((queriedGame) => res.json(queriedGame))
    .catch((err) => res.status(400).json({ err }));
};

// controller function to delete game doc by id
const deleteGame = (req, res) => {
  Game.deleteOne({ _id: req.params.id })
    .then((response) => res.json({ response }))
    .catch((err) => res.status(400).json({ err }));
};

// controller function to update game
const updateGame = (req, res) => {
  const { body, params } = req;
  // use req.params.id as id in query doc
  // use req.body as update doc
  Game.findOneAndUpdate({ _id: req.params.id }, req.body, {
    // new:true will make updated doc available in the .then success claue
    new: true,
    runValidators: true,
  })
    // respond to client w/ updated game doc
    .then((newGameDoc) => {
      res.json({ newGameDoc });
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  healthcheck,
  addNewGame,
  getAllGames,
  getGameById,
  deleteGame,
  updateGame,
};
