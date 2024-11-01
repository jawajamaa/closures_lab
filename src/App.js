import { useState } from 'react';

function App() {

  const [counter, setCounter] = useState(0)

  const handleClick = () => {
    console.log("I was clicked")
  }
 

  return (
    <div>
      {counter}
      <button onClick={handleClick}> Increment Counter </button>
    </div>
  );
}

export default App;
