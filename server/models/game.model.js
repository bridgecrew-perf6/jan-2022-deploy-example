const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    // this is how we add a required validation for this field
    // Second arg in [] is custom error message
    required: [true, "Name is required"],
    // this is how we add a minimum length validation for this field
    // first arg in [] is the min length for this field, second arg is
    // custom error message
    minlength: [7, "Name must be at least 7 characters"],
  },
  system: {
    // this is how we add a required validation for this field
    // Second arg in [] is custom error message
    required: [true, "Game system is required"],
    type: String,
    // this enum defined the ONLY accepted values for this field
    enum: ["XBOXONE", "PS4", "PC"],
  },
  multiplayer: {
    type: Boolean,
    default: false,
  },
  gameImgUrl: {
    type: String,
    required: [true, "Game Image url is required"],
    minlength: [7, "URL must be at least 7 characters"],
  },
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
