import Die from "./Die.jsx"
import Timer from "./Timer.jsx"
import Halloffame from "./Halloffame.jsx"
import React from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [startGame, setStartGame] = React.useState(false)
  const [time, setTime] = React.useState(0)
  const [bestTime, setBestTime] = React.useState(() => JSON.parse(localStorage.getItem("record")) || [])

  React.useEffect(() => {
    const checkHeld = dice.filter(it => it.isHeld)
    const checkDice = dice.reduce((acc, rec) => { return acc + rec.value }, 0)
    if ((checkHeld.length > 9) && (checkDice % 10 === 0)) {

      setStartGame(false)
      if (bestTime[0] > 1) {
        setBestTime((prevTime) => {
          if (prevTime[0] > time) {
            toast("NEW RECORD!!!!!", {
              position: toast.POSITION.TOP_CENTER
            })
            return [time, ...prevTime]
          }
          return [...prevTime, time]
        })
      } else {
        setBestTime([time])
      }
      setTenzies(true)
      setBestTime((prevItem) => prevItem.sort((a, b) => (a - b)))
      localStorage.setItem("record", JSON.stringify(bestTime))
    }
  },
    [dice])

  React.useEffect(() => {
    let start = Date.now()
    const refresh = startGame && setInterval(function () {
      let delta = Date.now() - start
      setTime(Math.floor(delta / 100))
    }, 100)
    return () => { clearInterval(refresh) }
  }, [startGame])

  const diceElements = dice.map(it => <Die key={it.id} value={it.value} held={it.isHeld} hold={() => holdDice(it.id)} />)

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const randomNum = new Array(10)
      .fill(null)
      .map(() => {
        return generateNewDice()

      })
    return randomNum
  }


  const resetRating = () => {
    localStorage.removeItem("record")
    setBestTime([0])
    setTime(0)
  }

  const rollDice = () => {
    if (tenzies) {
      setDice(allNewDice())
      setTenzies(false)
    } else
      setDice(prevDice => prevDice.map(it => {
        return it.isHeld ? it : generateNewDice()
      }))
  }

  function holdDice(id) {
    if (!tenzies) {
      setStartGame(true)
      setDice(() => dice.map(it => {
        return it.id === id ? { ...it, isHeld: !it.isHeld } : it
      }))
    }
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <ToastContainer style={{ width: "500px" }} />
      <div className="title">
        <h1>Tenzies</h1>
        <Timer curTime={time} bestTime={bestTime[0]} />
      </div>
      <div className="title-text">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</div>
      <div className="die-elements">
        {diceElements}
      </div>
      <button
        className="button"
        onClick={rollDice}
      >{tenzies ? "New Game" : "Roll"}</button>
      {tenzies && <button
        className="button"
        onClick={resetRating}
      >Reset rating</button>}
      <Halloffame rating={bestTime} />
    </main>
  )
}

export default App
