// script.js

// Wait until the page loads, then start our game  
document.addEventListener("DOMContentLoaded", init);

// === Global state ===
let selectedWord;     // the word to guess, e.g. "banana"
let guessedLetters;   // array of letters the player has tried
let remainingLives;   // how many wrong guesses left
let gameOver = false; // whether the game is over or not

// === 1) Initialization ===
function init() {
  // 1. Build our word list
  const data =
    "unicorn,firework,puppy,banana,cupcake,rainbow,guitar,candy,balloon," +
    "pirate,dragon,cookie,sunshine,rocket,castle,puzzle,bunny,zebra," +
    "penguin,wizard,icecream,beach,robot,magic,sparkle,clown,marshmallow," +
    "kitten,fairy,apple,popcorn,dance,jelly,crayon,whistle,glitter,party," +
    "tiger,bubbles,treasure,skate,smile,pillow,book,flower,cloud,butterfly," +
    "donut,star,moon,pencil,school,train,friend,birthday,lunch,shoe,chair," +
    "window,blanket,toy,car,truck,bus,slide,swing,park,zoo,circus,story," +
    "house,family,baby,dog,cat,bird,fish,hat,glove,sock,snow,leaf,tree,grass," +
    "milk,juice,cake,lollipop,bed,night,morning,music,game,laugh,block,paint," +
    "color,bubble";
  const words = data.split(",");

  // 2. Pick a random word
  selectedWord = words[Math.floor(Math.random() * words.length)];

  // 3. Reset game state
  guessedLetters = [];
  remainingLives = 6;
  gameOver = false;

  // 4. Initial render
  renderBlanks();
  drawHangman();  // will show the empty gallows

  // 5. Wire up buttons
  document.getElementById("guess-btn").addEventListener("click", onGuessClick);
  document.getElementById("reset-btn").addEventListener("click", resetGame);
  document.getElementById("hint-btn").addEventListener("click", showHint);
}

// === 2) Draw the blanks ===
function renderBlanks() {
  const display = document.getElementById("displayWord");
  let blanks = "";

  for (let i = 0; i < selectedWord.length; i++) {
    const ch = selectedWord[i];
    blanks += guessedLetters.includes(ch) ? ch + " " : "_ ";
  }

  display.textContent = blanks.trim();
}

// === 3) Handle a guess click ===
function onGuessClick() {
  if (gameOver) return;

  const input = document.getElementById("letter-input");
  let letter = input.value.trim();
  input.value = "";

  // validate
  if (!/^[a-z]$/i.test(letter)) {
    showStatus("Type a valid letter (A–Z)!");
    return;
  }

  letter = letter.toLowerCase();
  if (guessedLetters.includes(letter)) {
    showStatus("You already guessed that letter!");
    return;
  }

  // record & display
  guessedLetters.push(letter);
  document.getElementById("guessed-letters").textContent += ` ${letter.toUpperCase()}`;
  processGuess(letter);
}

// === 4) Check the guessed letter ===
function processGuess(letter) {
  if (selectedWord.includes(letter)) {
    renderBlanks();
    if (checkWin()) {
      gameOver = true;
      document.getElementById("guess-btn").disabled = true;
    }
    showStatus(`Nice! “${letter}” is in the word.`);
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

// === 5) Win detection ===
function checkWin() {
  if (selectedWord.split("").every(ch => guessedLetters.includes(ch))) {
    showStatus("You won! 🎉");
    gameOver = true;
    document.getElementById("guess-btn").disabled = true;
    return true;
  }
  return false;
}

// === 6) Show messages ===
function showStatus(msg) {
  const statusBox = document.getElementById("status");
  statusBox.textContent = msg;
}

// === 7) Reset the game ===
function resetGame() {
  showStatus("");
  document.getElementById("guess-btn").disabled = false;
  document.getElementById("guessed-letters").textContent = "";
  document.getElementById("letter-input").value = "";
  init();  // restart everything
}

// === 8) Hangman ASCII art stub ===
function drawHangman() {
  // TODO: determine stage index from remainingLives
  // TODO: grab <pre id="hangman"> and set its textContent accordingly
}

// === 9) Hint stub ===
function showHint() {
  // TODO: pick one unguessed letter from selectedWord and display it
}
