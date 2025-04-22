// script.js

var fs = require('fs')

// Wait until the page loads, then start our game  
document.addEventListener('DOMContentLoaded', init);

// === Global state (empty for now) ===
let selectedWord;     // the word to guess, e.g. "banana"
let guessedLetters;   // array of letters the player has tried
let remainingLives;   // how many wrong guesses left
let file;             // csv file with words

// === 1) Initialization ===
function init() {
  var words;
  file = fs.readFileSync('words.csv', {'encoding':'utf8'}, (err, data) => {
    if (err){
      console.error('Error reading file:', err);
      return;
    }
    words = data.split(',');
    selectedWord = words[Math.floor(Math.random()*100)];
  });
  
  guessedLetters = [];
  remainingLives = 6;

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
  var textInputBox = document.getElementById('letter-input');
  var letter = textInputBox.value.trim();
  textInputBox.value="";
  if (!((letter>='a'&&letter<='z')||(letter>='A'&&letter<='Z'))){
    showStatus("Type valid letter a-z!");
    return;
  }
  letter = letter.toLowerCase()
  if (guessedLetters.includes(letter)){
    showStatus("You have already guessed that letter!");
    return;
  }
  guessedLetters.push(letter);
  processGuess(letter);
}

// === 4) Check the guessed letter ===
function processGuess(letter) {
  if (selectedWord.includes(letter)){
    updateDisplay(letter);
    checkWin();
  } else {
    if (remainingLives>1){
      remainingLives-=1;
    } else {
      showStatus(`Game over, no lives remaining!\nWord was: ${selectedWord}`);
    }
  }
}

// === 5) Reveal correct letters ===
function updateDisplay(letter) {
  // TODO: for each character in selectedWord:
  //         if guessedLetters includes it, show it; otherwise show "_"
  // TODO: join them with spaces and set displayWord.textContent
}

// === 6) See if the player has won ===
function checkWin() {
  for (var i=0;i<selectedWord.length;i++){
    if (!guessedLetters.includes(selectedWord[i])){
      return false;
    }
  }
  showStatus("You won!");
  return true;
}

// === 7) Show messages ===
function showStatus(msg) {
  // TODO: grab <div id="status"> and set its textContent = msg
  // TODO (optional): add CSS classes like "error" or "success" for colors
}
