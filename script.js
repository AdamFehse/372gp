// script.js

// Wait until the page loads, then start our game  
document.addEventListener('DOMContentLoaded', init);

// === Global state (empty for now) ===
let selectedWord;     // the word to guess, e.g. "banana"
let guessedLetters;   // array of letters the player has tried
let remainingLives;   // how many wrong guesses left

// === 1) Initialization ===
function init() {
  // TODO: create an array of words (e.g. ["apple", "banana", "cherry"])
  // TODO: pick one at random and store it in selectedWord
  // TODO: set guessedLetters = [] and remainingLives = 6
  // TODO: call renderBlanks() to draw "_ _ _ _" on screen
  // TODO: wire up the Guess button:
  //         document.getElementById('guess-btn').addEventListener('click', onGuessClick)
}

// === 2) Draw the blanks ===
function renderBlanks() {
  // TODO: grab the <p id="displayWord"> element
  // TODO: build a string like "_ _ _ _" that matches selectedWord.length
  // TODO: set .textContent of displayWord to that string
}

// === 3) Handle a guess click ===
function onGuessClick() {
  // TODO: get the letter from <input id="letter-input">
  // TODO: clear the input box (so it's empty again)
  // TODO: if letter is empty or not a–z, call showStatus("Type a–z!") and return
  // TODO: if letter is already in guessedLetters, showStatus("You tried that!") and return
  // TODO: otherwise, add letter to guessedLetters
  // TODO: call processGuess(letter)
}

// === 4) Check the guessed letter ===
function processGuess(letter) {
  // TODO: if selectedWord includes(letter):
  //           call updateDisplay() to fill in blanks
  //       else:
  //           subtract 1 from remainingLives
  //           showStatus("Nope! X lives left.")
  // TODO: if remainingLives reaches 0, showStatus("Game over! Word was: " + selectedWord)
  // TODO: after a correct guess, call checkWin()
}

// === 5) Reveal correct letters ===
function updateDisplay() {
  // TODO: for each character in selectedWord:
  //         if guessedLetters includes it, show it; otherwise show "_"
  // TODO: join them with spaces and set displayWord.textContent
}

// === 6) See if the player has won ===
function checkWin() {
  // TODO: if every letter in selectedWord is in guessedLetters
  //         showStatus("You won!")
}

// === 7) Show messages ===
function showStatus(msg) {
  // TODO: grab <div id="status"> and set its textContent = msg
  // TODO (optional): add CSS classes like "error" or "success" for colors
}
