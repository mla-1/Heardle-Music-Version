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

  const [divwidth, setDivWidth] = useState(37.5)

  useEffect(() => {
    if(usedskips === 6){
      console.log('DONE')
      setLossPopUp(true)
    }
    else if(usedskips === 1){
      setDivWidth(75)
    }
    else if(usedskips === 2){
      setDivWidth(150)
    }
    else if(usedskips === 3){
      setDivWidth(262.2)
    }
    else if(usedskips === 4){
      setDivWidth(381.81)
    }
    else if(usedskips === 5){
      setDivWidth(600)
    }
  },[usedskips])

  useEffect(() => {
    console.log(divwidth)
    document.getElementById('musicbar').style.width = divwidth + "px"
  },[divwidth]) 

  const setSkips = () => {
    if (usedskips <= 5) {
      setUsedSkips(usedskips + 1)
      const word = 'SKIPPED'
      const array = [...numberofdiv,word]
      setNumberOfDiv(array)
    }
    else{
      setLossPopUp(true)
      console.log("You have run out of tries!")
    }
  }

  const showdivs = () => {
    console.log(usedskips)
    console.log(numberofdiv)
    console.log(divwidth)
  }
  return (
    <div className='background'>
      <div className="App">
        <div className='heading'>

          <button id='howtoplay-btn' onClick={() => setHowToPopUp(true)}>
          <i class="bi bi-question-circle"></i>
          </button>

          <p id='title'>UNLIMITED Heardle</p>

          
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
        <div id='musictimeline'>
        <div id='musicbar'></div>
        </div>
        <button id='musicplaybtn'>
          <i class="bi bi-play-circle"></i>
        </button>
        <input type="text" name="name" id='inputbox'placeholder=' Know it? Search for the artist / title'/>
        <div className='buttons'>
          <button id='skipbtn' onClick={() => {setSkips()}}>Skip</button>
          <button id='submitbtn' onClick={() => {showdivs()}}>SUBMIT</button>
        </div>
      </div>
    </div>
  );
}

export default App;
