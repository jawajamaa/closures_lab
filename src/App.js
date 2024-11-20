import { useState } from 'react';
import './App.css';

function App() {

  const [counter, setCounter] = useState(0)

  const handleClick = () => {
    console.log("I was clicked")
  }
 

  return (
    <div className='App'>
      <div className='counter'>
        <div></div>
        {counter}
      </div>
      <button onClick={handleClick} className='button'> Increment Counter </button>
    </div>
  );
}

export default App;
