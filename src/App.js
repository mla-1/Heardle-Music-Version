import './App.css';
import { useEffect, useState } from 'react'
import HowTo from './Howto';
import Info from './Info'
import LossPopUp from './LossPopUp';

function App() {

  const client_id = '003a9ac0f77b4fdfacc4d15a47209731'

  const client_secret = '794a68b4c14e4ad38dbe1b4127df9ca8'

  const [accessToken, setAccessToken] = useState('')

  const [currentsongid, setCurrentSongId] = useState('')

  const [howtopopup, setHowToPopUp] = useState(false)

  const [infopopup, setInfoPopUp] = useState(false)

  const [numberofdiv, setNumberOfDiv] = useState([])

  const [losspopup, setLossPopUp] = useState(false)

  const [usedskips, setUsedSkips] = useState(0)

  const [divwidth, setDivWidth] = useState(37.5)


  //updates the current div width depending on the current amount of 
  //used skips
  useEffect(() => {
    if(usedskips === 6){
      //console.log('DONE')
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

  //sets the width of the music bar every time the divwidth changes
  useEffect(() => {
    //console.log(divwidth)
    document.getElementById('musicbar').style.width = divwidth + "px"
  },[divwidth]) 

  //if a skip is initiated
  //this function is called and it appends the skipped array
  //if more than 5 skips are used then it initiates the 
  //game over popup

  const setSkips = () => {
    if (usedskips <= 5) {
      setUsedSkips(usedskips + 1)
      const word = 'SKIPPED'
      const array = [...numberofdiv,word]
      setNumberOfDiv(array)
    }
    else{
      setLossPopUp(true)
      //console.log("You have run out of tries!")
    }
  }

  //tester function that prints
  //the number of used skips 
  //current div width
  const showdivs = () => {
    //console.log(accessToken)
    //_getname()
    _getplaylist()
  }

  //runs only once in order to obtain the access token
  useEffect(() => {
    const _getToken = async () => {
      const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers : {
          "Content-Type": "application/x-www-form-urlencoded",
          'Authorization' : 'Basic ' + btoa( client_id + ':' + client_secret)
        }
      })
      const data = await result.json();
      setAccessToken(data.access_token)
    }
    _getToken()
  },[])

  //fetches the default playlist from the api
  //which is the top 50 usa playlist made by spotify
  const _getplaylist = async () => {
    const result = await fetch('https://api.spotify.com/v1/playlists/37i9dQZEVXbLRQDuF5jeBp',{
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + accessToken
      }
    })
    const data = await result.json();
    
    //random number between 0 and the length of the playlist
    const random_song = Math.floor(Math.random() * data.tracks.items.length)
    console.log(random_song)
    console.log(data.tracks.items[random_song])
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
