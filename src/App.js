import './App.css';
import { useEffect, useState } from 'react'
import HowTo from './Howto';
import Info from './Info'
import LossPopUp from './LossPopUp';
import { Windows, WindowSidebar } from 'react-bootstrap-icons';

function App() {
  //variables used to build the url that allows
  //for user authenication
  const CLIENT_ID = '003a9ac0f77b4fdfacc4d15a47209731'
  const AUTH_POINT = 'https://accounts.spotify.com/authorize'
  const REDIRECT_URI = 'http://localhost:3000/'
  const SCOPES = ["user-read-playback-state","user-modify-playback-state","user-read-currently-playing","app-remote-control","streaming"]
  const SCOPES_DELIM = "%20"
  const SCOPES_URL = SCOPES.join(SCOPES_DELIM)


  const [accessToken, setAccessToken] = useState('')

  const [currentsongid, setCurrentSongId] = useState('')

  const [howtopopup, setHowToPopUp] = useState(false)

  const [infopopup, setInfoPopUp] = useState(false)

  const [numberofdiv, setNumberOfDiv] = useState([])

  const [losspopup, setLossPopUp] = useState(false)

  const [usedskips, setUsedSkips] = useState(0)

  const [divwidth, setDivWidth] = useState(37.5)

  const [songlength, setSongLength] = useState(2000)


  useEffect(() => {
    if(window.location.hash){
      gettoken(window.location.hash)
    }
  },[])

  //if the acccess token is granted 
  //then we obtain a songid from the playlist
  useEffect(() => {
    _getplaylist()
  },[accessToken])

  //if the current song id is changed then we add it to the 
  //useEffect(()=> {
    //_playsong()

    //setTimeout(_pauseplayer, songlength)

  //},[currentsongid])

  //creates a url that prompts the user to
  //allow access to their account
  const _loginspotify = () => {
    window.location = `${AUTH_POINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL}&response_type=token&show_dialog=true`;
  }

  //takes the hash from the url and then parses it
  //to get the token
  const gettoken = (hash) => {
    const hashtag = hash.split("&")
    const token = hashtag[0].split('=')
    setAccessToken(token[1])   
  }

  //pauses the player at the current position of the song
  const _pauseplayer = async () => {
    const result = await fetch('https://api.spotify.com/v1/me/player/pause',{
      method: 'PUT',
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + accessToken
      }
    })
    const data = await result.json()
  }

  //Updates the player to
  //play the song that was selected by the getplaylist method
  const _playsong = async () => {
     const result = await fetch('https://api.spotify.com/v1/me/player/play',{
      method:'PUT',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + accessToken
      },
      body: JSON.stringify({
        "uris":[currentsongid],
        'position_ms': 0
      })
     })
     const data = await result.json()
     console.log(data)
  }

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
    console.log(data.tracks.items[random_song].track.uri)
    setCurrentSongId(data.tracks.items[random_song].track.uri)
  }

  const _playmusic = () => {
    _playsong()
    setTimeout(_pauseplayer, songlength)
  }

  const _skipcurrent = async () => {
    const next = await fetch('https://api.spotify.com/v1/me/player/next', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + accessToken
      }
    })
    const result = await next.json()
    console.log(result)
  }
  //adds the randomly selectd songid to the current queue
  const _additemtoqueue = async () => {
    const trackid = currentsongid.replaceAll(":", '%3A')
    console.log(trackid)
    const queue = await fetch('https://api.spotify.com/v1/me/player/queue?uri=' + trackid ,{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + accessToken
      }
    })
    const result = await queue.json();
  }

  //updates the current div width depending on the current amount of 
  //used skips
  useEffect(() => {
    if(usedskips === 6){
      //console.log('DONE')
      setLossPopUp(true)
    }
    else if(usedskips === 1){
      setDivWidth(75)
      setSongLength(3000)
    }
    else if(usedskips === 2){
      setDivWidth(150)
      setSongLength(5000)
    }
    else if(usedskips === 3){
      setDivWidth(262.2)
      setSongLength(8000)
    }
    else if(usedskips === 4){
      setDivWidth(381.81)
      setSongLength(12000)
    }
    else if(usedskips === 5){
      setDivWidth(600)
      setSongLength(17000)
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
    console.log(accessToken)
    console.log('song answer',currentsongid)
    console.log('length',songlength)
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

          <button id='loginbtn' onClick={() => _loginspotify()}>
          <i class="bi bi-person-circle"></i>
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
        <button id='musicplaybtn' onClick={() => {_playmusic()}}>
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
