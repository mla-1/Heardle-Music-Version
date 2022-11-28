
const HowTo = (props) => {
    return (props.trigger) ? (
        <div className="main">
            <div className="popup">
                <div className="popup-header">
                    <div>
                    <p id ='howto-title'>How to Play</p>
                    </div>
                    <div>
                    <p id='rule1'> Listen to the intro, then find the correct artist & title in the list.</p>
                    </div>
                    <div>
                    <p id="rule2"> Skipped or incorrect attempts unlock more of the intro.</p>
                    </div>
                    <div>
                    <p id='rule3'> Answer in as few tries as possible and share your score!</p>
                    </div>
                    <button id='closebtn' onClick={() => {props.setTrigger(false); }}>X</button>
                    <button id='playbtn'onClick={() => {props.setTrigger(false); }}>Play</button>
                    {props.children}
                </div>
            </div>
        </div>
    ):"";
}
export default HowTo