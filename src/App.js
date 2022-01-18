import { useEffect, useState } from 'react'
import './App.css'
import SingleCards from './components/SingleCards'

const cardData = [
  { "src": "img/helmet-1.png", matched: false },
  { "src": "img/potion-1.png", matched: false },
  { "src": "img/ring-1.png", matched: false },
  { "src": "img/scroll-1.png", matched: false },
  { "src": "img/shield-1.png", matched: false },
  { "src": "img/sword-1.png", matched: false }
]


function App() {

  const [card, setCard] = useState(null)
  const [turn, setTurn] = useState(0)
  const [choiceCard1, setChoiceCard1] = useState(null)
  const [choiceCard2, setChoiceCard2] = useState(null)
  const [disable, setDisable] = useState(false)

  const shuffleCard = () => {

    const shuffledCards = [...cardData, ...cardData]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))

    setCard(shuffledCards)
    setTurn(0)
  }

  const cardTurn = (card) => {
    choiceCard1 ? setChoiceCard2(card) : setChoiceCard1(card)

  }

  useEffect(() => {

    if (choiceCard1 && choiceCard2) {
      setDisable(true)
      if (choiceCard1.src === choiceCard2.src) {

        setCard((prev) => {
          let new_cards = prev.map((el) => {
            if (el.src === choiceCard1.src) {
              return { ...el, matched: true }
            } else {
              return el
            }
          })

          return new_cards
        })

        reset()
      } else {

        setTimeout(() => {

          reset()
        }, 1000)
      }


    }

    /// winner
    let e = card && card.every(el => el.matched === true)


    if (e) {

      setTimeout(() => {

        alert("Your The Winner")
        reset()
        shuffleCard()
      }, 2000)
    }


  }, [choiceCard1, choiceCard2])

  const reset = () => {
    setChoiceCard1(null)
    setChoiceCard2(null)
    setTurn(prev => prev + 1)
    setDisable(false)

  }



  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCard}>New Game</button>
      <div className="card__grid">
        {card && card.map((card) => {
          return <SingleCards
            card={card}
            key={card.id}
            clickEvent={cardTurn}
            flipped={card === choiceCard1 || choiceCard2 === card || card.matched}
            disable={disable}
          />
        })}

      </div>
      {turn ? <div className="turns"> <p> Turns {turn} </p></div> : ""}
    </div>
  );
}

export default App