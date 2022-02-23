import logo from "./logo.svg";
import "./App.css";
import GameForm from "./components/GameForm";
import { Router } from "@reach/router";
import DisplayAll from "./components/DisplayAll";
import DisplayOne from "./components/DisplayOne";
import UpdateGame from "./components/UpdateGame";

function App() {
  return (
    <div>
      <Router>
        {/* define paths for client.  */}
        <UpdateGame path="/game/:id/edit" />
        <GameForm path="/new-game" />
        <DisplayAll path="/" />
        <DisplayOne path="/game/:id" />
      </Router>
    </div>
  );
}

export default App;
