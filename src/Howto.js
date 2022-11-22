
const HowTo = (props) => {
    return (props.trigger) ? (
        <div className="main">
            <div className="popup">
                <div className="popup-header">
                    <p>hiiiii</p>
                    <button id='closebtn' onClick={() => {props.setTrigger(false); }}>Close</button>
                    {props.children}
                </div>
            </div>
        </div>
    ):"";
}
export default HowTo