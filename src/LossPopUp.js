
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
                        <button id='listenbtn'>Listen on Spotify</button>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    ):"";
}

export default LossPopUp