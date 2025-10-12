'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const display = document.querySelector('.displayWinner');
const Emoji = document.querySelector('.emoji');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

//Starting conditions

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
Emoji.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
display.classList.add('hidden');

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice != 1) {
      currentScore += dice;
      // current0El.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player's total score
    scores[activePlayer] += currentScore;

    // Update UI
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 5) {
      //currentPlayer wins
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      btnHold.classList.add('hidden');
      btnRoll.classList.add('hidden');
      display.classList.remove('hidden');
      display.textContent = `Player ${activePlayer + 1} wins 🥇!`;
      display.classList.add('name');
      Emoji.classList.remove('hidden');

      document
        .querySelectorAll('.current')
        .forEach(el => el.classList.add('hidden'));
      playing = false;
    } else {
      // Reset current score for that player
      document.getElementById(`current--${activePlayer}`).textContent = 0;

      // Switch player
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;

      // Toggle active player visual highlight
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

btnNew.addEventListener('click', function () {
  currentScore = 0;
  activePlayer = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  scores = [0, 0];
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
  display.classList.add('hidden');
  Emoji.classList.add('hidden');
  document
    .querySelectorAll('.current')
    .forEach(el => el.classList.remove('hidden'));
  playing = true;
});
