import React, { useState } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = useState(()=>generateAllNewDice())
    const [gameEnd, setGameState]= useState(false)
    var gameWon = false;
    const rollButton = React.useRef(null)
    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }))
    }
    

  { 
    // var i = 0;
    // var allHeld = true;
    // for(i = 0; i < dice.length; i++){
    //   console.log(dice[i].value)
    //   if (i + 1 <  dice.length - 1){
    //     if (dice[i].value != dice[i + 1].value){
    //       break;
    //     }
    //   }
    //   if (!dice[i].isHeld)
    //     allHeld = false
    // }
    
    // if (i == dice.length  && allHeld)
    //   console.log("game won"
  }


  gameWon = (
        dice.every(die => die.isHeld) && 
        dice.every(die => die.value === dice[0].value)
    ) 

    React.useEffect(() => {
      if (gameWon && rollButton.current !== null) {
        console.log("focused")
          rollButton.current.focus()
      }
  }, [gameWon])
  
    function rollDice() {
      if(gameWon){
        gameWon = !gameWon
        setDice(generateAllNewDice(6))
        return
      }
      setDice(dice=>dice.map(item=>
        !item.isHeld?{...item, value: Math.ceil(Math.random() * 6)}:item
      ))
    }

    function hold(id){
      setDice(prev=>prev.map(item=>
      item.id === id?
      {
        ...item, isHeld:!item.isHeld
      }:
      item
    ))
      gameWon && rollButton.current.focus()
    }
 
    const diceElements = dice.map(dieObj => 
      <Die 
        key={dieObj.id}
        dieObj={dieObj}
        hold={()=>hold(dieObj.id)}
        />)

    return (
        <main>
          {gameWon && <Confetti/>}
          <div aria-live="polite" className="sr-only">
              {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
          </div>
           <h1 className="title">Tenzies</h1>
           <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button ref={rollButton} className="roll-dice" onClick={rollDice}>{!gameWon?'Roll':'New Game'}</button>
        </main>
    )
}