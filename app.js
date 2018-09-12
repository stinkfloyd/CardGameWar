document.addEventListener("DOMContentLoaded", () => {
  let cardCount = 0
  let deckCount = 1
  let playerOneWins = 0
  let playerTwoWins = 0
  let playerOne = []
  let playerTwo = []
  let button = document.getElementById(`play`)
  let message = document.getElementById(`message`)
  let playerOneCard = document.getElementById(`firstCard`)
  let playerTwoCard = document.getElementById(`secondCard`)
  let gamesOne = document.getElementById(`gamesOne`)
  let gamesTwo = document.getElementById(`gamesTwo`)
  let decksPlayed = document.getElementById(`decksPlayed`)
  axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`).then((response) => {
      let { data } = response
      dealCards(data.deck_id)
      button.addEventListener("click", playGame)
  })

  function playGame() {
    if (cardCount === 25) {
      button.innerText = `Deal New Decks`
    }
    if (cardCount < 26) {
      let cardOne = playerOne.pop()
      let cardTwo = playerTwo.pop()
      playerOneCard.setAttribute(`src`, cardOne.image)
      playerTwoCard.setAttribute(`src`, cardTwo.image)

      if (cardOne.value === cardTwo.value) {
        message.innerText = `Tie Game! Play again`
        cardCount++
        return
      }
      let cardOneValue = parseCard(cardOne.value)
      let cardTwoValue = parseCard(cardTwo.value)

      if (cardOneValue > cardTwoValue) {
        message.innerText = `Player One Wins!`
        playerOneWins++
        gamesOne.innerText = playerOneWins
      } else {
        message.innerText = `Player Two Wins!`
        playerTwoWins++
        gamesTwo.innerText = playerTwoWins
      }
      cardCount++
    } else {
      button.innerText = `GO TO WAR!`
      message.innerText = `New Decks dealt!`
      deckCount++
      decksPlayed.innerText = deckCount
      cardCount = 0
      button.removeEventListener("click", playGame)
      axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`).then((response) => {
          let { data } = response
          dealCards(data.deck_id)
          setTimeout(() => {
            button.addEventListener("click", playGame)
          }, 1000)
      })
    }
  }

  function parseCard(card) {
    switch (card) {
      case "ACE": return 14
      case "KING": return 13
      case "QUEEN": return 12
      case "JACK": return 11
      default: return parseInt(card, 10)
    }
  }

  function dealCards(deckId) {
    splitDeck(deckId, playerOne, false)
  }

  function splitDeck(deckId, player, checked) {
    axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=26`).then((response) => {
        let { data } = response
        let { cards } = data
        for (let i = 0; i < 26; i++)
          player.push(cards[i]);
          if (!checked) {
            splitDeck(deckId, playerTwo, true)
          }
    })
  }
  // This is a new comment! yay
})
