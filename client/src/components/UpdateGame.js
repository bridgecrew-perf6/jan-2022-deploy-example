import { navigate } from "@reach/router";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const UpdateGame = (props) => {
  const [name, setName] = useState("");
  const [system, setSystem] = useState("");
  const [multiplayer, setMultiplayer] = useState(false);
  const [gameImgUrl, setGameImgUrl] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/game/${props.id}`)
      .then((response) => {
        console.log(response);
        // setGameData(response.data);
        setName(response.data.name);
        setSystem(response.data.system);
        setMultiplayer(response.data.multiplayer);
        setGameImgUrl(response.data.gameImgUrl);
        setId(response.data._id);
      })
      .catch((err) => console.log(err.response));
  }, []);

  const handleUpdateGame = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/game/${id}`, {
        name,
        system,
        multiplayer,
        gameImgUrl,
      })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => console.log(err.response));
  };
  return (
    <form onSubmit={handleUpdateGame}>
      <h1>Update Game {name}</h1>
      <div>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        System:
        <select
          name=""
          id=""
          value={system}
          onChange={(e) => setSystem(e.target.value)}
        >
          <option value="XBOXONE">XBOXONE</option>
          <option value="PS4">PS4</option>
          <option value="PC">PC</option>
        </select>
      </div>
      <div>
        Mulitplayer:{" "}
        <input
          type="checkbox"
          value={multiplayer}
          onChange={() => setMultiplayer(!multiplayer)}
        />
      </div>
      <div>
        game Img url
        <input
          type="text"
          value={gameImgUrl}
          onChange={(e) => setGameImgUrl(e.target.value)}
        />
      </div>
      <button>Submit</button>
    </form>
  );
};

export default UpdateGame;
