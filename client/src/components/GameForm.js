import { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
const GameForm = () => {
  const [name, setName] = useState("");
  const [system, setSystem] = useState("");
  const [multiplayerBool, setMultiplayerBool] = useState(false);
  const [gameImgUrl, setGameImgUrl] = useState("");
  const [errors, setErrors] = useState({});
  // submit handler function
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      // axios.post() takes 2 args: the url, and the form data to be sent to server
      .post("http://localhost:8000/api/game", {
        name,
        system,
        multiplayerBool,
        gameImgUrl,
      })
      // success block if axios post resovled successfully
      .then((response) => {
        console.log("SUCCESS");
        console.log(response);
        navigate("/");
      })
      // error block is axios post rejected unsuccessfully
      .catch((err) => {
        console.log("ERROR");
        console.log(err.response.data.err.errors);
        setErrors(err.response.data.err.errors);
      });
  };
  return (
    <div className="container">
      <h1>Add New Favorite Video Game</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        {/* check if errors.name exists. if it does, display error message */}
        {errors.name ? <p>{errors.name.message}</p> : null}
        <div>
          <label htmlFor="system">System</label>
          {/* dropdown menu */}
          <select
            name=""
            id="system"
            onChange={(e) => setSystem(e.target.value)}
            className="form-control"
          >
            <option>------------</option>
            <option value="XBOXONE">XBOXONE</option>
            <option value="PS4">PS4</option>
            <option value="PC">PC</option>
          </select>
        </div>
        {/* if errors.system exists, display error message */}
        {errors.system ? <p>{errors.system.message}</p> : null}
        <div>
          <label htmlFor="multi">Multiplayer?</label>
          <input
            type="checkbox"
            name=""
            id="multi"
            className="form-check-input"
            onChange={() => setMultiplayerBool(!multiplayerBool)}
          />
        </div>
        <div>
          <label htmlFor="imgUrl">IMG URL</label>
          <input
            type="text"
            id="imgUrl"
            onChange={(e) => setGameImgUrl(e.target.value)}
            className="form-control"
          />
        </div>
        {errors.gameImgUrl ? <p>{errors.gameImgUrl.message}</p> : null}
        <button type="submit">Submit</button>
        {/* loop through error object keys and display error messages */}
        {errors
          ? Object.keys(errors).map((k, index) => {
              return <p key={index}>{errors[k].message}</p>;
            })
          : null}

        {/* {errors &&
              Object.keys(errors).map((errKey, index) => (
                <p className="error-text" key={index}>
                  {errors[errKey].message}
                </p>
              ))} */}
      </form>
    </div>
  );
};

export default GameForm;
