'use strict'

// Выборка элементов
const score0Element = document.querySelector('#score--0')
const score1Element = document.getElementById('score--1')
const current0Element = document.getElementById('current--0')
const current1Element = document.getElementById('current--1')
const diceElement = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
const player0Element = document.querySelector('.player--0')
const player1Element = document.querySelector('.player--1')

// Начальные условия игры

let totalScores, currentScore, activePlayer, isPlaying

const initGame = function () {
  totalScores = [0, 0]
  currentScore = 0
  activePlayer = 0
  isPlaying = true

  diceElement.classList.add('hidden')
  player0Element.classList.remove('player--winner')
  player1Element.classList.remove('player--winner')
  player0Element.classList.remove('player--active')
  player1Element.classList.remove('player--active')
  player0Element.classList.add('player--active')
  score0Element.textContent = 0
  score1Element.textContent = 0
  current0Element.textContent = 0
  current1Element.textContent = 0
}

initGame()

const switchActivePlayer = function () {
  currentScore = 0
  document.getElementById(`current--${activePlayer}`).textContent = currentScore
  activePlayer = activePlayer === 0 ? 1 : 0
  player0Element.classList.toggle('player--active')
  player1Element.classList.toggle('player--active')
}

// Бросаем кубик
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    //1. Сгенерировать случайное число
    const diceNumber = Math.trunc(Math.random() * 6) + 1
    // 2. Отобразить число на кубике
    diceElement.classList.remove('hidden')
    diceElement.src = `dice${diceNumber}.png`

    // 3. Если число = 1, сменить игрока
    if (diceNumber !== 1) {
      currentScore += diceNumber
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore
    } else {
      switchActivePlayer()
    }
  }
})

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    // 1 Добавить текущие очки к очкам активного игрока
    totalScores[activePlayer] += currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer]
    //  2. если общие очки >= 100, текущий игрок выиграл, если нет, переключить игрока
    if (totalScores[activePlayer] >= 10) {
      isPlaying = false
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner')
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active')
      diceElement.classList.add('hidden')
    } else {
      switchActivePlayer()
    }
  }
})

btnNew.addEventListener('click', initGame)
