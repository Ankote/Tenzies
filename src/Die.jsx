import "./style/Die.css"

export default function Die(props)
{
    const style={
        backgroundColor:"#59E391"
    }

    return(
        <button
        className="btn-die"
        style={props.dieObj.isHeld ? style : null}
        onClick={props.hold}
        aria-pressed={props.isHeld}
        aria-label={`Die with value ${props.value}, 
        ${props.isHeld ? "held" : "not held"}`}
         >
            {props.dieObj.value}
         </button>
    )
}