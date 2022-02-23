import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";

const DisplayAll = () => {
  const [games, setGames] = useState([]);
  const [hasBeenDeletedBoolean, setHasBeenDeletedBoolean] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/game")
      .then((response) => {
        console.log(response.data);
        setGames(response.data);
      })
      .catch((err) => console.log(err.response));
  }, []);

  const handleDeleteGame = (idFromBelow) => {
    axios
      .delete(`http://localhost:8000/api/game/${idFromBelow}`)
      .then((response) => {
        console.log(response);
        setHasBeenDeletedBoolean(!hasBeenDeletedBoolean);
        const filteredGames = games.filter((game) => {
          return game._id !== idFromBelow;
        });
        setGames(filteredGames);
        // navigate("/");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div>
      {/* {games.map((game) => {
        return (
          <div key={game._id}>
            <p>Name: {game.name}</p>
            <p>Name: {game.system}</p>
            <p>Multi: {game.multiplayer}</p>
            <p>Img: {game.gameImgUrl}</p>
            <hr style={{ borderTop: "2px solid white", height: "4px" }} />
          </div>
        );
      })} */}
      <Link to="/new-game">New Game</Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">System</th>
            <th scope="col">Multiplayer</th>
            <th scope="col">Game img</th>
            <th scope="col">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => {
            return (
              <tr key={game._id}>
                <th scope="row">{game.name}</th>
                <td>{game.system}</td>
                {game.multiplayer === true ? <td>Yes</td> : <td>No</td>}
                <td>{game.multiplayer}</td>
                <td>
                  <img
                    style={{ height: "200px" }}
                    src={`${game.gameImgUrl}`}
                    alt=""
                  />
                </td>
                <td>
                  <button onClick={() => navigate(`/game/${game._id}/edit`)}>
                    EDIT
                  </button>
                  <button
                    onClick={() => handleDeleteGame(game._id)}
                    className="btn btn-danger"
                  >
                    DELETE
                  </button>
                  <Link to={`/game/${game._id}`}>details</Link>
                  {/* need a tag? link somehow to another component */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayAll;
