
const Info = (props) => {
 return (props.trigger) ?(
    <div className="main">
        <div className="popup">
            <div className="popup-header">
                <p id='info-title'>About</p>
                <p id='info-text'> Each daily Heardle features a clip from a popular song. 
                Guess in as few tries as possible, and be sure to come back every
                day for a new song.</p>
                <p id='info-text'>With UNLIMITED Heardle, Users can play as many times they want!</p>
                <button id='closebtn'onClick={() => {props.setTrigger(false)}}>x</button>
                {props.children}
            </div>
        </div>
    </div>
 ):"";
}

export default Info