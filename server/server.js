// express setup
const express = require("express");
const cors = require("cors");
const app = express();

// we need this line to accept requests from our react client
app.use(cors());
// config express to use json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// require mongoose config
require("./config/mongoose.config");
require("./routes/game.routes")(app);
app.listen(8000, () => {
  console.log("Listening at Port 8000");
});
