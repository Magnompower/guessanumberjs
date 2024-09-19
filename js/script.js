// DOM element selections
const lblMessage = document.querySelector(".message");
const lblNumber = document.querySelector(".number");
const lblScore = document.querySelector(".score");
const lblHighScore = document.querySelector(".highscore");
const inpGuess = document.querySelector(".guess");
const pbAgain = document.querySelector(".again");
const pbCheck = document.querySelector(".check");

// Game constants
const maxScore = 20;
const initialNumber = "?";
const colorDefault = "#222";
const colorWin = "green";
const colorLose = "red";
const colorCloseCall = "yellow";
const colorWhite = "white";

// Game variables
let score = 20;
let number = Math.trunc(Math.random() * 20) + 1;
let highScore = localStorage.getItem('highScore') ? Number(localStorage.getItem('highScore')) : 0; // Retrieve high score from localStorage or initialize to 0
lblHighScore.textContent = highScore;

function generateNewRandomNumberAndResetPage() {
    inpGuess.disabled = false;
    pbCheck.disabled = false;

    score = maxScore;
    lblScore.textContent = score;
    number = Math.trunc(Math.random() * 20) + 1; // Gets a new number between 1 and 20
    setNumberDisplayed(initialNumber, colorDefault);
    setBackgroundColor(colorDefault);
    inpGuess.value = "";
    setMessage("Start guessing...");
}

function guessNumber() {
    const guess = Number(inpGuess.value);

    if (!validateUserGuess(guess)) {
        return;
    }
    checkAnswer(guess);
}

function validateUserGuess(guess) {
    if (!guess) {
        setMessage("⛔️ No number entered.. Write a number between 1 and 20!", colorLose);
        return false;
    }
    if (guess < 1 || guess > 20) {
        setMessage("🚫 Please enter a number between 1 and 20!", colorLose);
        return false;
    }
    return true;
}

function checkAnswer(guess) {
    if (guess === number) {
        playerWins();
        return;
    }

    if (score > 0) {
        determineActionBasedOnGuess(guess);
    }

    if (score <= 0) {
        playerLost();
        return;
    }
}

function playerWins() {
    setMessage("Correct Number! You won!");
    setBackgroundColor(colorWin);
    setNumberDisplayed(number, colorWin);
    if (score > highScore) {
        highScore = score;
        lblHighScore.textContent = highScore;
        localStorage.setItem('highScore', highScore);
    }
    inpGuess.disabled = true;
    pbCheck.disabled = true;
}

function determineActionBasedOnGuess(guess) {
    if (Math.abs(guess - number) <= 2 && guess !== number) { // Within 2 numbers of the correct number
        setBackgroundColor(colorCloseCall);
    } else {
        setBackgroundColor(colorDefault);
    }

    setMessage(guess > number ? "Too high!" : "Too low!"); // Ternary operator
    score--;
    lblScore.textContent = score;
}

function playerLost() {
    setMessage("You lost! 😢");
    setBackgroundColor(colorLose);
    setNumberDisplayed(number, colorLose);
    inpGuess.disabled = true;
    pbCheck.disabled = true;
}

function setMessage(message, color = colorWhite) {
    lblMessage.textContent = message;
    lblMessage.style.color = color;
}
function setBackgroundColor(color) {
    document.querySelector("body").style.backgroundColor = color;
}
function setNumberDisplayed(content, color) {
    lblNumber.textContent = content;
    lblNumber.style.color = color;
}

pbAgain.addEventListener("click", generateNewRandomNumberAndResetPage);
pbCheck.addEventListener("click", guessNumber);
inpGuess.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        guessNumber();
    }
});
document.addEventListener('keydown', function (event) {
    if (event.key === 'y') {
        setNumberDisplayed(number, colorCloseCall);
    }
});
document.addEventListener('keydown', function (event) {
    if (event.key === 'u') {
        setNumberDisplayed("?", colorDefault);
    }
});
document.addEventListener('keydown', function (event) {
    if (event.key === 'r') {
        generateNewRandomNumberAndResetPage();
    }
});
