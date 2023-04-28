import Die from "./Die.jsx"
import React from 'react'
import { nanoid } from 'nanoid'

function App() {

  const [dice, SetDice] = React.useState(allNewDice())

  const diceElements = dice.map(it => <Die key={it.id} value={it.value} held={it.isHeld} hold={() => holdDice(it.id)} />)

  function allNewDice() {
    const randomNum = new Array(10)
      .fill(null)
      .map(() => {
        return {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
        }
      })
    return randomNum
  }

  function holdDice(id) {
    SetDice(() => dice.map(it => it.id === id ? it = { ...it, isHeld: !it.isHeld } : it = { ...it }))
    console.log(dice)
  }

  return (
    <main>
      <div className="title">
        <h1>Tenzies</h1>
      </div>
      <div className="title-text">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</div>
      <div className="die-elements">
        {diceElements}
      </div>
      <button
        className="button"
        onClick={() =>
          SetDice(allNewDice())
        }
      >Roll</button>
    </main>
  )
}

export default App
