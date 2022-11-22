import './App.css';
import { useState } from 'react'
import HowTo from './Howto';


function App() {
  const [howtopopup, setHowToPopUp] = useState(false)
  
  return (
    <div className="App">
      <div className='heading'>
        <p id='title'>UNLIMITED Heardle</p>
        <button id='howtoplay-btn' onClick={() => setHowToPopUp(true)}>
        <i class="bi bi-question-circle"></i>
        </button>
      </div>
      <HowTo trigger={howtopopup} setTrigger={setHowToPopUp}>
        </HowTo>
    </div>
    
  );
}

export default App;
