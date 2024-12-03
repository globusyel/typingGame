// DOM Elements
const textToType = document.getElementById("text");
const inputField = document.getElementById("input");
const timeDisplay = document.getElementById("time");
const errorsDisplay = document.getElementById("errors");
const levelDisplay = document.getElementById("level");
const restartButton = document.getElementById("restart");

// Game Variables
const levels = ["Text1", "Text2", "Text3", "Text4"];
let currentLevel = 1;
let timeLeft = 60;
let errors = 0;
let timer;

function Game() {
  // Reset variables
  currentLevel = 0;
  timeLeft = 60;
  errors = 0;

  // Update UI
  textToType.textContent = levels[currentLevel];
  timeDisplay.textContent = `${timeLeft}s`;
  errorsDisplay.textContent = errors;
  levelDisplay.textContent = currentLevel + 1;

  // Clear input field
  inputField.value = "";
  inputField.disabled = false;
  inputField.focus();

  // Start Timer
  startTimer();
}

// Start Timer
function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = `${timeLeft}s`;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// Check Input
inputField.addEventListener("input", () => {
  const typedText = inputField.value;
  const targetText = levels[currentLevel];

  if (typedText === targetText) {
    // Move to next level
    if (currentLevel < levels.length - 1) {
      currentLevel++;
      textToType.textContent = levels[currentLevel];
      levelDisplay.textContent = currentLevel + 1;
      inputField.value = "";
    } else {
      // End game if all levels are completed
      endGame(true);
    }
  } else {
    // Count errors
    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] !== targetText[i]) {
        errors++;
        errorsDisplay.textContent = errors;
        break;
      }
    }
  }
});

// End Game
function endGame(win = false) {
  clearInterval(timer);
  inputField.disabled = true;
  const message = win ? "You won!" : "Time's up. Try again.";
  alert(message);
}

// Restart Game
restartButton.addEventListener("click", Game);

// Start Game on Page Load
window.onload = Game;
