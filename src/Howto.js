
const HowTo = (props) => {
    return (props.trigger) ? (
        <div className="StartRoutinePopup">
            <div className="StartRoutinePopup-Inner">
                <div>
                <p>hiiiii</p>
                <button id='closebtn' onClick={() => {props.setTrigger(false); }}>Close</button>
                {props.children}
                </div>
            </div>
        </div>
    ):"";
}
export default HowTo