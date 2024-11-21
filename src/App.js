import { useState } from "react";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
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
