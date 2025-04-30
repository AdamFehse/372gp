// script.js

// Wait until the page loads, then start our game
document.addEventListener("DOMContentLoaded", init);

// === Global state (empty for now) ===
let selectedWord; // the word to guess, e.g. "banana"
let guessedLetters; // array of letters the player has tried
let remainingLives; // how many wrong guesses left
let file; // csv file with words
let gameOver = false; // whether the game is over or not

// === 1) Initialization ===
function init() {
  var data =
    "unicorn,firework,puppy,banana,cupcake,rainbow,guitar,candy,balloon,pirate,dragon,cookie,sunshine,rocket,castle,puzzle,bunny,zebra,penguin,wizard,icecream,beach,robot,magic,sparkle,clown,marshmallow,kitten,fairy,apple,popcorn,dance,jelly,crayon,whistle,glitter,party,tiger,bubbles,treasure,skate,smile,pillow,crayon,book,flower,cloud,butterfly,donut,star,moon,pencil,school,train,friend,birthday,lunch,shoe,chair,window,blanket,toy,car,truck,bus,slide,swing,park,zoo,circus,story,house,family,baby,dog,cat,bird,fish,hat,glove,sock,snow,leaf,tree,grass,milk,juice,cake,lollipop,bed,night,morning,music,game,laugh,block,paint,color,bubble";
  var words = data.split(",");
  selectedWord = words[Math.floor(Math.random() * 100)];
  guessedLetters = [];
  remainingLives = 6;

  // call renderBlanks() to draw "_ _ _ _" on screen
  renderBlanks();

  // wire up the Guess button
  // wire up the Hint button
  // wire up the Reset button
  document.getElementById("guess-btn").addEventListener("click", onGuessClick);
  document.getElementById("reset-btn").addEventListener("click", resetGame);
  document.getElementById("hint-btn").addEventListener("click", showHint);

  // Enter btn submits a guess
  const input = document.getElementById("letter-input");
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      onGuessClick();
    }
  });
}

// === 2) Draw the blanks ===
function renderBlanks() {
  // TODO: grab the <p id="displayWord"> element
  // TODO: build a string like "_ _ _ _" that matches selectedWord.length
  // TODO: set .textContent of displayWord to that string
  const display = document.getElementById("displayWord");
  let blanks = "";
  for (let i = 0; i < selectedWord.length; i++) {
    const letter = selectedWord[i];
    if (guessedLetters.includes(letter)) {
      blanks += letter + " ";
    } else {
      blanks += "_ ";
    }
  }
  display.textContent = blanks.trim();
}

// === 3) Handle a guess click ===
function onGuessClick() {
  if (gameOver) return;

  var textInputBox = document.getElementById("letter-input");
  var letter = textInputBox.value.trim();
  textInputBox.value = "";
  if (!((letter >= "a" && letter <= "z") || (letter >= "A" && letter <= "Z"))) {
    showStatus("Type valid letter a-z!");
    return;
  }
  letter = letter.toLowerCase();
  if (guessedLetters.includes(letter)) {
    showStatus("You have already guessed that letter!");
    return;
  } else {
    showStatus("");
    guessedLetters.push(letter);
    processGuess(letter);
  }
}

// === 4) Check the guessed letter ===
function processGuess(letter) {
  if (selectedWord.includes(letter)) {
    renderBlanks();
    if (checkWin()) {
      gameOver = true;
      document.getElementById("guess-btn").disabled = true;
    }
  } else {
    remainingLives--;
    if (remainingLives > 0) {
      showStatus(`Remaining lives: ${remainingLives}`);
    } else {
      showStatus(`Game Over! The word was: ${selectedWord}`);
      gameOver = true;
      document.getElementById("guess-btn").disabled = true;
    }
  }
}

// do we need this function, previously it was just calling renderBlanks
// === 5) Reveal correct letters ===
function updateDisplay(letter) {
  // TODO: for each character in selectedWord:
  //         if guessedLetters includes it, show it; otherwise show "_"
  // TODO: join them with spaces and set displayWord.textContent
}

// === 6) See if the player has won ===
function checkWin() {
  for (i = 0; i < selectedWord.length; i++) {
    if (!guessedLetters.includes(selectedWord[i])) {
      return false;
    }
  }
  // if we make it here the letters have been guessed, game over.
  showStatus("You won!");
  gameOver = true;
  document.getElementById("guess-btn").disabled = true;
  return true;
}

// === 7) Show messages ===
function showStatus(msg) {
  const statusBox = document.getElementById("status");
  statusBox.textContent = msg;
}

/**
 * Reset the game to its initial state
 */
function resetGame() {
  // Clear any status text
  showStatus("");

  // Re-enable the Guess button
  document.getElementById("guess-btn").disabled = false;

  // Reset globals
  gameOver = false;
  remainingLives = 6;
  guessedLetters = [];

  // Pick a new word
  var data =
    "unicorn,firework,puppy,banana,cupcake,rainbow,guitar,candy,balloon,pirate,dragon,cookie,sunshine,rocket,castle,puzzle,bunny,zebra,penguin,wizard,icecream,beach,robot,magic,sparkle,clown,marshmallow,kitten,fairy,apple,popcorn,dance,jelly,crayon,whistle,glitter,party,tiger,bubbles,treasure,skate,smile,pillow,crayon,book,flower,cloud,butterfly,donut,star,moon,pencil,school,train,friend,birthday,lunch,shoe,chair,window,blanket,toy,car,truck,bus,slide,swing,park,zoo,circus,story,house,family,baby,dog,cat,bird,fish,hat,glove,sock,snow,leaf,tree,grass,milk,juice,cake,lollipop,bed,night,morning,music,game,laugh,block,paint,color,bubble";
  const words = data.split(",");
  selectedWord = words[Math.floor(Math.random() * words.length)];

  // Draw the blanks
  renderBlanks();
  // drawHangman();  need to add this next

  // Clear the input box
  document.getElementById("letter-input").value = "";
}

// Stub for hint logic
function showHint() {
  // TODO: pick and display one random unguessed letter
  // this is already wired up just need to do something
}

// Stub for drawing the hangman ASCII art
// Since we  start with 6 lives, stage 0 is index 0, stage 6 is final:
function drawHangman() {
  // TODO: determine which stage index to show based on remainingLives
  // TODO: grab the <pre id="hangman"> element, I have added this to the HTML
  // TODO: set its textContent to hangmanStages[stageIndex]
  // We need to be bale to decide which stage of hangman to display.
  //
  // I have a prior ascii art I made for a python project:
  /**
   * 
   * const hangmanStages = [
` 
   +---+
   |   |
       |
       |
       |
       |
=========`,`
   +---+
   |   |
   O   |
       |
       |
       |
=========`,
`   +---+
   |   |
   O   |
   |   |
       |
       |
=========`,
`   +---+
   |   |
   O   |
  /|   |
       |
       |
=========`,
`   +---+
   |   |
   O   |
  /|\\  |
       |
       |
=========`,
`   +---+
   |   |
   O   |
  /|\\  |
  /    |
       |
=========`,
`   +---+
   |   |
   O   |
  /|\\  |
  / \\  |
       |
=========`  
];
   */
}
