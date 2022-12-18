
const Winning = (props) => {
    return(props.trigger)? (
        <div className="main">
            <div className="popup">
                <div className="popup-header">
                    <div>
                        <button id='closebtn'onClick={() => {props.setTrigger(false)}}>x</button>
                        <img src = {props.albumart} width='150' height='150' id='winningalbumart'/>
                        <p id="winningsongname">{props.songname}</p>
                        <p id='encouragingwords'>An Act of Genius!</p>
                        <p id='artist'>{props.artist}</p>
                        <p id='winningyear'>{props.year}</p>
                        <p id="seconds">You got today's Heardle within {props.seconds/1000} seconds.</p>
                        <a href={props.songlink}>
                            <button id='listensongbtn'>Listen on Spotify</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    ):"";
}

export default Winning