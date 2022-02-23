import { navigate } from "@reach/router";
import axios from "axios";
import { useEffect, useState } from "react";

import "../App.css";
const DisplayOne = (props) => {
  const { id } = props;
  const [gameData, setGameData] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/game/${id}`)
      .then((response) => {
        console.log(response);
        setGameData(response.data);
      })
      .catch((err) => console.log(err.response));
  }, []);

  const handleDeleteGame = (idFromBelow) => {
    axios
      .delete(`http://localhost:8000/api/game/${idFromBelow}`)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div style={{ marginLeft: "200px" }}>
      <h1>Details for {gameData.name}</h1>
      {/* <p>Name: {gameData}</p> */}
      <div className="details-circle-box">
        <p>Game Name: {gameData.name}</p>
        <p>System: {gameData.system}</p>
        <p>
          Multiplayer:{" "}
          {gameData.multiplayer ? <span>Yes</span> : <span>No</span>}
        </p>
        <p>
          Game Image:{" "}
          <img
            style={{ height: "200px" }}
            src={`${gameData.gameImgUrl}`}
            alt=""
          />
        </p>
      </div>
      <button
        style={{ marginLeft: "180px", marginTop: "20px" }}
        className="btn btn-danger"
        onClick={() => handleDeleteGame(gameData._id)}
      >
        DELETE: {gameData.name}
      </button>
    </div>
  );
};

export default DisplayOne;
