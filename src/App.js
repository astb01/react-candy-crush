import classes from "./App.module.css";
import Game from "./components/game/Game";

function App() {
  return (
    <div className={classes.main}>
      <h1>Candy Crush</h1>
      <Game />
    </div>
  );
}

export default App;
