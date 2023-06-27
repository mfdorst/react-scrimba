import { useState } from 'react'
import Die from './Die'

export default function App() {
  const [dice, setDice] = useState(() =>
    Array(10)
      .fill()
      .map(() => ({ number: rollDie(), locked: false }))
  )

  function rollDie() {
    return Math.floor(Math.random() * 6) + 1
  }

  function rollDice() {
    setDice((dice) =>
      dice.map((die) => (die.locked ? die : { ...die, number: rollDie() }))
    )
  }

  function toggleLocked(index) {
    setDice((dice) =>
      dice.map((die, i) => {
        if (i === index) {
          const locked = die.locked ? false : true
          return { ...die, locked }
        } else {
          return die
        }
      })
    )
  }

  const dieElements = dice.map((die, i) => (
    <Die
      key={i}
      value={die.number}
      locked={die.locked}
      onClick={() => toggleLocked(i)}
    />
  ))

  return (
    <main className='main'>
      <h1 className='title'>Tenzies</h1>
      <p className='description'>
        Roll until all dice are the same. <br />
        Click each die to freeze it at its current value.
      </p>
      <div className='dice-container'>{dieElements}</div>
      <div className='roll-button' onClick={rollDice}>
        Roll
      </div>
    </main>
  )
}
