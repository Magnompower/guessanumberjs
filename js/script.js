const lblMessage = document.querySelector(".message");
const lblNumber = document.querySelector(".number");
const lblScore = document.querySelector(".score");
const lblHighScore = document.querySelector(".highscore");
const inpGuess = document.querySelector(".guess");
const pbAgain = document.querySelector(".again");
const pbCheck = document.querySelector(".check");

let score = document.querySelector(".score").textContent;
let highScore = document.querySelector(".highscore").textContent;
let number = Math.trunc(Math.random() * 20) + 1;
console.log(number)

function generateRandomNumber() {
    score = 20;
    lblScore.textContent = 20;
    number = Math.trunc(Math.random() * 20) + 1;
    lblNumber.textContent = "?";
    lblNumber.style.color = "#222";
    document.querySelector("body").style.backgroundColor = "#222";
    
}

function guessNumber() {
    const guess = inpGuess.value;
    if (guess == number) {
        lblMessage.textContent = "Correct Number! You won!";
        document.querySelector("body").style.backgroundColor = "green";
        if (score > highScore) {
            lblHighScore.textContent = score
        }
        lblNumber.textContent = number
        lblNumber.style.color = "green";
    } else {
        lblMessage.textContent = "Wrong Number! Try again!";
        score--
        console.log(score)
        lblScore.textContent = score;
        console.log(number)
    }
    if (score <= 0) {
        lblMessage.textContent = "You lost!";
        document.querySelector("body").style.backgroundColor = "red";
    }
    if (score < 0) {
        score++;
    }
}

inpGuess.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        guessNumber();
    }
});

pbAgain.addEventListener("click", generateRandomNumber)

pbCheck.addEventListener("click", guessNumber)