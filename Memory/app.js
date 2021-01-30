document.addEventListener('DOMContentLoaded', () => {
  //cartas
  const cardArray = [
    {
      name: 'idea',
      img: 'imgs/blank.png'
    },
    {
      name: 'music',
      img: 'imgs/music.png'
    },
    {
      name: 'pencil',
      img: 'imgs/pencil.png'
    },
    {
      name: 'portrait',
      img: 'imgs/portrait.png'
    },
    {
      name: 'puzze',
      img: 'imgs/puzze.png'
    },
    {
      name: 'reddit',
      img: 'imgs/reddit.png'
    },
    {
      name: 'idea',
      img: 'imgs/idea.png'
    },
    {
      name: 'music',
      img: 'imgs/music.png'
    },
    {
      name: 'pencil',
      img: 'imgs/pencil.png'
    },
    {
      name: 'portrait',
      img: 'imgs/portrait.png'
    },
    {
      name: 'puzze',
      img: 'imgs/puzze.png'
    },
    {
      name: 'reddit',
      img: 'imgs/reddit.png'
    }
  ]

  let emojis = ['😀', '😅', '🥺', '😂', '👍', '😉', '🙃', '🤫']

  cardArray.sort(() => 0.5 - Math.random())

  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  const feedBack = document.querySelector('#feedback')
  let erros = 0;
  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []


  //cria o tabuleiro
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', 'imgs/blank.png')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
  }

  //checar os pares
  function checkForMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]

    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'imgs/blank.png')
      cards[optionTwoId].setAttribute('src', 'imgs/blank.png')
      feedBack.textContent = 'A ideia é escoher escolher duas cartas, tipo DUAS cartas diferentes! 🤦‍♂️'

    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      feedBack.textContent = 'Não esperava por essa você achou um par, 😲'
      erros = 0,
      cards[optionOneId].setAttribute('src', 'imgs/white.png')
      cards[optionTwoId].setAttribute('src', 'imgs/white.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
    } else {
      cards[optionOneId].setAttribute('src', 'imgs/blank.png')
      cards[optionTwoId].setAttribute('src', 'imgs/blank.png')
      erros++;
      
      if (erros === 3) {
        feedBack.textContent = 'Uhh! mais um erro, Se tiver dificil posso dar uma dica 😉. Brincadeirinha, sem dicas pra você 😂'
      } else {
        feedBack.textContent = 'Errou! ' + emojis[Math.floor(Math.random() * emojis.length - 2)]
      }

    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if (cardsWon.length === cardArray.length / 2) {
      resultDisplay.textContent = 'Parabés você encontrou todos! Espero que tenha sido um tempo bem gasto.'
      feedBack.textContent = 'Parabés você encontrou todos! Espero que tenha sido um tempo bem gasto.'
    }
  }

  //vira a carta
  function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500)
    }
  }

  createBoard()
})