
const LossPopUp = (props) => {
    return (props.trigger)? (
        <div className="main">
            <div className="popup">
                <div className="popup-header">
                    <div>
                        <p id='lossheader'>Unlucky!</p>
                        <button id='closebtn'onClick={() => {props.setTrigger(false)}}>x</button>
                        <p id='losstext'>You didn't get today's Heardle.</p>
                        <p id='losstext'>Better luck tomorrow!</p>
                        <p id='lineseparater'>------</p>
                        <img src = {props.albumart} width='150' height='150' id='albumart'/>
                        <p id="losingsongname">{props.songname}</p>
                        <p id='losingartist'>{props.artist}</p>
                        <p id='losingyear'>{props.year}</p>
                        <a href={props.songlink}>
                            <button id='listenbtn'>Listen on Spotify</button>
                        </a>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    ):"";
}

export default LossPopUp