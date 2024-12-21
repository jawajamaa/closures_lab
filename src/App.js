import { useState } from "react";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    console.log("I was clicked!")
    setTimeout(() => {
      console.log("Set timeout ran!")
      setCounter(prevState => prevState + 1);
    }, 1000)
  };

  return (
    <div className="App">
      <div className="counter">
        {counter}
      </div>
      <button onClick={handleClick} className="button">
        Increment Counter
      </button>
    </div>
  );
}

export default App;
