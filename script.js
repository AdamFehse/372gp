// script.js

// Wait until the page loads, then start our game
document.addEventListener("DOMContentLoaded", init);

// Global states
let selectedWord; // the word to guess, "banana"
let guessedLetters; // array of letters the player has tried
let remainingLives; // how many wrong guesses left
let gameOver = false; // whether the game is over or not

// Initialization 
function init() {
  var data =
    "unicorn,firework,puppy,banana,cupcake,rainbow,guitar,candy,balloon,pirate,dragon,cookie,sunshine,rocket,castle,puzzle,bunny,zebra,penguin,wizard,icecream,beach,robot,magic,sparkle,clown,marshmallow,kitten,fairy,apple,popcorn,dance,jelly,crayon,whistle,glitter,party,tiger,bubbles,treasure,skate,smile,pillow,crayon,book,flower,cloud,butterfly,donut,star,moon,pencil,school,train,friend,birthday,lunch,shoe,chair,window,blanket,toy,car,truck,bus,slide,swing,park,zoo,circus,story,house,family,baby,dog,cat,bird,fish,hat,glove,sock,snow,leaf,tree,grass,milk,juice,cake,lollipop,bed,night,morning,music,game,laugh,block,paint,color,bubble";
  var words = data.split(",");
  selectedWord = words[Math.floor(Math.random() * 100)];
  guessedLetters = [];
  remainingLives = 6;

  // call renderBlanks() to draw "_ _ _ _" on screen
  renderBlanks();

  drawHangman();

  // wire up the buttons
  document.getElementById("guess-btn").addEventListener("click", onGuessClick);
  document.getElementById("reset-btn").addEventListener("click", resetGame);
  document.getElementById("hint-btn").addEventListener("click", showHint);

  // Enter btn submits a guess
  const input = document.getElementById("letter-input");
  input.focus();
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      onGuessClick();
    }
  });

  // toggle dark class on <body>
  document.getElementById("dark-mode").addEventListener("click", () => {
    //console.log("Dark mode button clicked");
    document.body.classList.add("dark");
  });

  // remove it for light mode
  document.getElementById("light-mode").addEventListener("click", () => {
    //console.log("Light mode button clicked");
    document.body.classList.remove("dark");
  });
}

// Draw the blanks
function renderBlanks() {
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

// Handle a guess click
function onGuessClick() {
  if (gameOver) return;

  var textInputBox = document.getElementById("letter-input");
  var letter = textInputBox.value.trim();
  textInputBox.value = "";
  textInputBox.focus();
  if (!((letter >= "a" && letter <= "z") || (letter >= "A" && letter <= "Z"))) {
    showStatus("Type valid letter a-z!");
    return;
  }
  letter = letter.toLowerCase();
  if (guessedLetters.includes(letter)) {
    showStatus("You have already guessed that letter!");
    return;
  } else {
    showStatus(`Remaining lives: ${remainingLives}`);
    guessedLetters.push(letter);
    // This part just creates a span per letter so that we can change the color per letter
    // Red = Wrong, Green = Correct
    const span = document.createElement("span");
    span.textContent = `${letter.toUpperCase()}, `;
    if (selectedWord.includes(letter)) {
      span.style.color = "green";
    } else {
      span.style.color = "red";
    }
    document.getElementById("guessed-letters").appendChild(span);
    processGuess(letter);
  }
}

// Check the guessed letter
function processGuess(letter) {
  if (selectedWord.includes(letter)) {
    renderBlanks();
    if (checkWin()) {
      gameOver = true;
      document.getElementById("guess-btn").disabled = true;
    }
  } else {
    remainingLives--;
    drawHangman();
    if (remainingLives > 0) {
      showStatus(`Remaining lives: ${remainingLives}`);
    } else {
      showStatus(`Game Over! The word was: ${selectedWord}`);
      gameOver = true;
      document.getElementById("guess-btn").disabled = true;
    }
  }
}

// See if the player has won
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
  // trigger confetti effect
  celebrateWin();
  return true;
}

// Show messages
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
  // Clears the guessed letters
  document.getElementById("guessed-letters").textContent = "";
  document.getElementById("guessed-letters").innerHTML = "";

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
  drawHangman();
  
  // Clear the input box
  document.getElementById("letter-input").value = "";
  document.getElementById("letter-input").focus();
}

// Stub for hint logic
function showHint() {
  if (gameOver) return;
  const remaining = selectedWord
    .split("")
    .filter((ch) => !guessedLetters.includes(ch));

  if (remaining.length === 0) {
    showStatus("No hints left!");
    return;
  }
  const hintLetter = remaining[Math.floor(Math.random() * remaining.length)];

  showStatus(`Hint: try "${hintLetter.toUpperCase()}"`);
}

/**
 * Spawn a burst of "confetti" emojis
 */
function celebrateWin() {
  const container = document.getElementById("game-container");
  // create 30 little emojis at random x positions
  for (let i = 0; i < 30; i++) {
    const span = document.createElement("span");
    span.textContent = "🤩";
    span.classList.add("confetti-piece");
    // random horizontal start 
    span.style.left = Math.random() * 100 + "vw";
    // random delay
    span.style.animationDelay = Math.random() * 0.5 + "s";
    container.appendChild(span);
    // remove after animation
    span.addEventListener("animationend", () => span.remove());
  }
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
  const hangmanStages = [
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
  document.getElementById("hangman").textContent = hangmanStages[6 - remainingLives];
   
}
