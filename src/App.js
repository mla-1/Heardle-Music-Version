import './App.css';
import { useEffect, useState } from 'react'
import HowTo from './Howto';
import Info from './Info'
import LossPopUp from './LossPopUp';

function App() {

  const [howtopopup, setHowToPopUp] = useState(false)

  const [infopopup, setInfoPopUp] = useState(false)

  const [numberofdiv, setNumberOfDiv] = useState([])

  const [losspopup, setLossPopUp] = useState(false)

  const [usedskips, setUsedSkips] = useState(0)

  useEffect(() => {
    if(usedskips == 6){
      console.log('DONE')
      setLossPopUp(true)
    }
  },[usedskips])

  const setSkips = () => {
    if (usedskips <= 5) {
      setUsedSkips(usedskips + 1)
      const word = 'SKIPPED'
      const array = [...numberofdiv,word]
      setNumberOfDiv(array)
    }
    else{
      console.log("You have run out of tries!")
    }
  }

  const showdivs = () => {
    console.log(usedskips)
    console.log(numberofdiv)
  }
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
        <div className='box1'>{numberofdiv[0]}</div>
        <div className='box1'>{numberofdiv[1]}</div>
        <div className='box1'>{numberofdiv[2]}</div>
        <div className='box1'>{numberofdiv[3]}</div>
        <div className='box1'>{numberofdiv[4]}</div>
        <div className='box1'>{numberofdiv[5]}</div>
        <LossPopUp trigger={losspopup} setTrigger={setLossPopUp}>

        </LossPopUp>
        <div className='buttons'>
          <button id='skipbtn' onClick={() => {setSkips()}}>Skip</button>
          <button id='submitbtn' onClick={() => {showdivs()}}>SUBMIT</button>
        </div>
      </div>
    </div>
  );
}

export default App;
