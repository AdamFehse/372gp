/*
  script.js
  CSC 372, Spring 2025, Group 5 Final Project (Hangman Game)
  Authors: Adam Fehse, Anthony Martin, Jack Williams, and Arsha Wissinger
 */

// Wait until the page loads, then start our game
document.addEventListener("DOMContentLoaded", init);

// Global states
let selectedWord;     // the word to guess, "banana"
let guessedLetters;   // array of letters the player has tried
let remainingLives;   // how many wrong guesses left
let gameOver = false; // whether the game is over or not

// Initialization.
function init() {
  var data =  // possible words to guess
    "unicorn,firework,puppy,banana,cupcake,rainbow,guitar,candy,balloon,pirate,dragon,cookie,sunshine,rocket,castle,puzzle,bunny,zebra,penguin,wizard,icecream,beach,robot,magic,sparkle,clown,marshmallow,kitten,fairy,apple,popcorn,dance,jelly,crayon,whistle,glitter,party,tiger,bubbles,treasure,skate,smile,pillow,crayon,book,flower,cloud,butterfly,donut,star,moon,pencil,school,train,friend,birthday,lunch,shoe,chair,window,blanket,toy,car,truck,bus,slide,swing,park,zoo,circus,story,house,family,baby,dog,cat,bird,fish,hat,glove,sock,snow,leaf,tree,grass,milk,juice,cake,lollipop,bed,night,morning,music,game,laugh,block,paint,color,bubble";
  var words = data.split(",");
  selectedWord = words[Math.floor(Math.random() * 100)];

  guessedLetters = [];
  remainingLives = 6;

  // Call renderBlanks() to draw "_ _ _ _" on screen (to be replaced as play continues):
  renderBlanks();

  // Draw the initial hangman:
  drawHangman();

  // Wire up the buttons:
  document.getElementById("guess-btn").addEventListener("click", onGuessClick);
  document.getElementById("reset-btn").addEventListener("click", resetGame);
  document.getElementById("hint-btn").addEventListener("click", showHint);

  // Set up the enter button (to submit a guess):
  const input = document.getElementById("letter-input");
  input.focus();
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      onGuessClick();
    }
  });

  // Toggle dark class on <body>:
  document.getElementById("dark-mode").addEventListener("click", () => {
    document.body.classList.add("dark");
  });

  // Remove it for light mode:
  document.getElementById("light-mode").addEventListener("click", () => {
    document.body.classList.remove("dark");
  });
}

// Draw the blanks for the guessed word so far.
function renderBlanks() {
  const display = document.getElementById("displayWord");

  // Iterate through each character, printing those that have been geussed:
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

// Handle a guess click.
function onGuessClick() {
  // If the game is over, do nothing:
  if (gameOver) return;

  var textInputBox = document.getElementById("letter-input");
  var letter = textInputBox.value.trim();
  letter = letter.toLowerCase();

  textInputBox.value = "";
  textInputBox.focus();

  // Verify input:
  if (!((letter >= "a" && letter <= "z"))) {
    showStatus("Type valid letter a-z!");
    return;
  } else if (guessedLetters.includes(letter)) {
    showStatus("You have already guessed that letter!");
    return;
  } else {  // valid input
    // Show remaining lives:
    showStatus(`Remaining lives: ${remainingLives}`);
    guessedLetters.push(letter);

    // Create a span per guessed letter, each either red or green (for wrong or right):
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

// Check the guessed letter.
function processGuess(letter) {
  if (selectedWord.includes(letter)) {  // if the letter is in the word
    renderBlanks();

    // Check if the game is over:
    if (checkWin()) {
      gameOver = true;
      document.getElementById("guess-btn").disabled = true;
    }
  } else {  // if the letter is not in the word
    // Decrement lives and redraw hangman:
    remainingLives--;
    drawHangman();

    // Check if the game is over:
    if (remainingLives > 0) {
      showStatus(`Remaining lives: ${remainingLives}`);
    } else {
      showStatus(`Game Over! The word was: ${selectedWord}`);
      gameOver = true;
      document.getElementById("guess-btn").disabled = true;
    }
  }
}

// See if the player has won.
function checkWin() {
  // Iterate through letters, verifying each has been guessed:
  for (i = 0; i < selectedWord.length; i++) {
    if (!guessedLetters.includes(selectedWord[i])) {
      return false;
    }
  }

  // All letters guessed, so victory:
  showStatus("You won!");
  gameOver = true;
  document.getElementById("guess-btn").disabled = true;
  celebrateWin(); // trigger confetti effect
  return true;
}

// Show status messages.
function showStatus(msg) {
  const statusBox = document.getElementById("status");
  statusBox.textContent = msg;
}

// Reset the game to its initial state.
function resetGame() {
  // Clear any lingering status text:
  showStatus("");

  // Clear the guessed letters:
  document.getElementById("guessed-letters").textContent = "";
  document.getElementById("guessed-letters").innerHTML = "";

  // Re-enable the Guess button:
  document.getElementById("guess-btn").disabled = false;

  // Reset globals:
  gameOver = false;
  remainingLives = 6;
  guessedLetters = [];

  // Pick a new word:
  var data =
    "unicorn,firework,puppy,banana,cupcake,rainbow,guitar,candy,balloon,pirate,dragon,cookie,sunshine,rocket,castle,puzzle,bunny,zebra,penguin,wizard,icecream,beach,robot,magic,sparkle,clown,marshmallow,kitten,fairy,apple,popcorn,dance,jelly,crayon,whistle,glitter,party,tiger,bubbles,treasure,skate,smile,pillow,crayon,book,flower,cloud,butterfly,donut,star,moon,pencil,school,train,friend,birthday,lunch,shoe,chair,window,blanket,toy,car,truck,bus,slide,swing,park,zoo,circus,story,house,family,baby,dog,cat,bird,fish,hat,glove,sock,snow,leaf,tree,grass,milk,juice,cake,lollipop,bed,night,morning,music,game,laugh,block,paint,color,bubble";
  const words = data.split(",");
  selectedWord = words[Math.floor(Math.random() * words.length)];

  // Draw the blanks and the empty hangman:
  renderBlanks();
  drawHangman();
  
  // Clear the input box:
  document.getElementById("letter-input").value = "";
  document.getElementById("letter-input").focus();
}

// Give a hint to the user.
function showHint() {
  if (gameOver) return;

  // Collect remaining letters to be guessed:
  const remaining = selectedWord
    .split("")
    .filter((ch) => !guessedLetters.includes(ch));

  if (remaining.length === 0) {
    showStatus("No hints left!");
    return;
  }

  // Give a random unguessed letter:
  const hintLetter = remaining[Math.floor(Math.random() * remaining.length)];
  showStatus(`Hint: try "${hintLetter.toUpperCase()}"`);
}

// Spawn a burst of "confetti" emojis.
function celebrateWin() {
  const container = document.getElementById("game-container");

  // Create 30 little emojis at random x positions:
  for (let i = 0; i < 30; i++) {
    const span = document.createElement("span");
    span.textContent = "🤩";
    span.classList.add("confetti-piece");

    span.style.left = Math.random() * 100 + "vw"; // random horizontal start
    span.style.animationDelay = Math.random() * 0.5 + "s";  // random delay
    container.appendChild(span);

    // Remove after animation:
    span.addEventListener("animationend", () => span.remove());
  }
}

// Draw the hangman based on remaining lives.
function drawHangman() {
  const hangmanStages = [ // possible hangman ASCII prints
`   +---+
   |   |
       |
       |
       |
       |
=========`,
`   +---+
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

  // Display the current hangman:
  document.getElementById("hangman").textContent = hangmanStages[6 - remainingLives];
}
