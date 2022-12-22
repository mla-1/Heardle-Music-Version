import './App.css';
import { useEffect, useState } from 'react'
import HowTo from './Howto';
import Info from './Info'
import LossPopUp from './LossPopUp';
import Winning from './Winning';
import Options from './Options';

function App() {
  //variables used to build the url that allows
  //for user authenication
  const CLIENT_ID = '003a9ac0f77b4fdfacc4d15a47209731'
  const AUTH_POINT = 'https://accounts.spotify.com/authorize'
  const REDIRECT_URI = 'http://localhost:3000/'
  const SCOPES = ["user-read-playback-state","user-modify-playback-state","user-read-currently-playing","app-remote-control","streaming"]
  const SCOPES_DELIM = "%20"
  const SCOPES_URL = SCOPES.join(SCOPES_DELIM)

  //access token used for authentication in api calls
  const [accessToken, setAccessToken] = useState('')

  //id of the current guessing song
  const [currentsongid, setCurrentSongId] = useState('')

  //boolean for handling the how-to-play popup
  const [howtopopup, setHowToPopUp] = useState(false)

  //boolean for controlling the info popup
  const [infopopup, setInfoPopUp] = useState(false)

  //handles the divs that display skips, and wrong answers
  const [numberofdiv, setNumberOfDiv] = useState([])

  //boolean for controlling the loss popup
  const [losspopup, setLossPopUp] = useState(false)

  //boolean for controlling the win popup
  const [winpopup, setWinPopUp] = useState(false)

  //int for keeping track of the amount of skips used
  const [usedskips, setUsedSkips] = useState(0)

  //controls the current div size that represents the progress bar
  const [divwidth, setDivWidth] = useState(37.5)

  //represents the song length in milliseconds
  const [songlength, setSongLength] = useState(2000)

  //variable used to hold the current song name
  const [songname, setSongName] = useState('')

  //variable used to hold the link to the current song's album art
  const [albumartlink, setAlbumArtLink] = useState('')

  //holds the link for the current song
  const [songlink, setSongLink] = useState('')

  //holds the name of the artist of the current song
  const [artist, setArtist] = useState('')

  //year of the song
  const [year, setYear] = useState()

  //boolean for options popup
  const [options, setOptions] = useState(false)

  const [playlistlink, setPlaylistLink] = useState()

  //use effect that runs once in order to check whether the token has been obtained 
  //and is in the window url
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

    let link = '37i9dQZEVXbLRQDuF5jeBp'

    const result = await fetch('https://api.spotify.com/v1/playlists/' + link, {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + accessToken
      }
    })
    const data = await result.json();
    
    //random number between 0 and the length of the playlist
    const random_song = Math.floor(Math.random() * data.tracks.items.length)
    console.log(data.tracks.items[random_song].track.name)
    setSongLink(data.tracks.items[random_song].track.external_urls.spotify)
    setAlbumArtLink(data.tracks.items[random_song].track.album.images[1].url)
    setSongName(data.tracks.items[random_song].track.name)
    setCurrentSongId(data.tracks.items[random_song].track.uri)

    var date = data.tracks.items[random_song].track.album.release_date
    date = date.split('-')

    setYear(date[0])
    setArtist(data.tracks.items[random_song].track.artists[0].name)
  }

  //plays song depending on the current guessing duration
  const _playmusic = () => {
    console.log(currentsongid)
    _playsong()
    setTimeout(_pauseplayer, songlength)
    console.log(playlistlink)
  }

  //plays song without a time limit
  const _playmusicwinning = () => {
    _playsong()
  }

  //updates the current div width depending on the current amount of 
  //used skips
  useEffect(() => {
    if(usedskips === 6){
      //console.log('DONE')
      setLossPopUp(true)
      _playmusicwinning()
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
  //game over popup and plays the current song in it's entirety

  const setSkips = () => {
    if (usedskips <= 5) {
      setUsedSkips(usedskips + 1)
      const word = 'SKIPPED'
      const array = [...numberofdiv,word]
      setNumberOfDiv(array)
    }
    else{
      _playmusicwinning()
      setLossPopUp(true)
    }
  }

  //tester function that prints
  //the number of used skips 
  //current div width
  const validator = () => {
    const response = document.getElementById('inputbox').value;
    var score = require('string-score')
    let answer = score(songname, response,0.3)
    console.log(answer)
    if (answer >= 0.85){
      console.log('win')
      _playmusicwinning()
      setWinPopUp(true)
    }
    else{
      if (usedskips <= 5) {
        setUsedSkips(usedskips + 1)
        const word = response
        const array = [...numberofdiv,word]
        setNumberOfDiv(array)
      }
    }
  }

  return (
    <div className='background'>
      <div className="App">
        <div className='heading'>

          <button id='options-btn' onClick={() => setOptions(true)}>
          <i class="bi bi-gear"></i>
          </button>

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

        <LossPopUp trigger={losspopup} setTrigger={setLossPopUp} albumart={albumartlink} songlink={songlink} year={year} artist={artist} songname={songname}>
        </LossPopUp>

        <Winning trigger={winpopup} setTrigger={setWinPopUp} albumart={albumartlink} songlink={songlink} songname={songname} seconds={songlength} year={year} artist={artist}>
        </Winning>

        <Options trigger={options} setTrigger={setOptions} playlistlink={playlistlink} setPlaylistLink={setPlaylistLink} accessToken={accessToken} setSongLink={setSongLink} setAlbumArtLink={setAlbumArtLink} setSongName={setSongName} setCurrentSongId={setCurrentSongId} setYear={setYear} setArtist={setArtist}>

        </Options>
        <div id='musictimeline'>
        <div id='musicbar'></div>
        </div>
        <button id='musicplaybtn' onClick={() => {_playmusic()}}>
          <i class="bi bi-play-circle"></i>
        </button>
        <input type="text" name="inputbox" id='inputbox'placeholder=' Know it? Search for the artist / title'/>
        <div className='buttons'>
          <button id='skipbtn' onClick={() => {setSkips()}}>Skip</button>
          <button id='submitbtn' onClick={() => {validator()}}>SUBMIT</button>
        </div>
      </div>
    </div>
  );
}

export default App;
