const Options = (props) => {

    //cleans the link from the user
    //into something that the api is able to recognize
    const _cleanlink = (text) => {
        let link = text.split('?si')
        link = link[0].split('playlist/')
        link = link[1]
        props.setPlaylistLink(link)
    }

    //api call that calls and sets the states with the new playlist link
    const _getnewplaylist = async () => {
        let link = props.playlistlink

        const result = await fetch('https://api.spotify.com/v1/playlists/' + link, {
          method: 'GET',
          headers: {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + props.accessToken
          }
        })
        const data = await result.json();
        
        //random number between 0 and the length of the playlist
        const random_song = Math.floor(Math.random() * data.tracks.items.length)
        console.log(data.tracks.items[random_song].track.name)
        props.setSongLink(data.tracks.items[random_song].track.external_urls.spotify)
        props.setAlbumArtLink(data.tracks.items[random_song].track.album.images[1].url)
        props.setSongName(data.tracks.items[random_song].track.name)
        props.setCurrentSongId(data.tracks.items[random_song].track.uri)
    
        var date = data.tracks.items[random_song].track.album.release_date
        date = date.split('-')
    
        props.setYear(date[0])
        props.setArtist(data.tracks.items[random_song].track.artists[0].name)
    }

    return (props.trigger)?(

        <div className="main">
            <div className="popup">
                <div className="popup-header">
                    <h1 id='playlist-heading'>Enter your Playlist Link</h1>
                    <div id='inputforlink'>
                        <input type="text" name="inputlink" id='inputlink'placeholder='What do you want to listen to?'/>
                        {props.children}
                    </div>

                    <div id='playlistlink-btn-div'>
                    <button id='playlistlink-btn' onClick={() => {_cleanlink(document.getElementById('inputlink').value); _getnewplaylist()}}>Submit</button>
                    </div>
                    <button id='closebtn'onClick={() => {props.setTrigger(false)}}>x</button>
                </div>
            </div>
        </div>

    ):"";
}
export default Options