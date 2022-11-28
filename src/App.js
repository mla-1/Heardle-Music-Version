import './App.css';
import { useState } from 'react'
import HowTo from './Howto';
import Info from './Info'

function App() {

  const [howtopopup, setHowToPopUp] = useState(false)
  const [infopopup, setInfoPopUp] = useState(false)

  return (
    <div className='background'>
      <div className="App">
        <div className='heading'>
  
          <p id='title'>UNLIMITED Heardle</p>

          <button id='howtoplay-btn' onClick={() => setHowToPopUp(true)}>
          <i class="bi bi-question-circle"></i>
          </button>

          <button id='infobtn' onClick={() => setInfoPopUp(true)}>
          <i class="bi bi-info-circle"></i>
          </button>
        </div>
        <HowTo trigger={howtopopup} setTrigger={setHowToPopUp}>
          </HowTo>
        <Info trigger={infopopup} setTrigger={setInfoPopUp}>
        </Info>
        <div className='box1'></div>
        <div className='box2'></div>
        <div className='box3'></div>
        <div className='box4'></div>
        <div className='box5'></div>
        <div className='box6'></div>

        <div className='buttons'>
          <button id='skipbtn'>Skip</button>
          <button id='submitbtn'>SUBMIT</button>
        </div>
      </div>
    </div>
  );
}

export default App;
