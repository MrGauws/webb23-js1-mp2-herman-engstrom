// Declaring the choices, since the choices never change, they are uppercase.

const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

// Variables to keep track of the game

let playerScore = 0;
let computerScore = 0;
let roundNumber = 1;

// ********************** QUERY-SELECTORS ********************** //

const rockBtn = document.querySelector("#rock");
const paperBtn = document.querySelector("#paper");
const scissorsBtn = document.querySelector("#scissors");
const resultText = document.querySelector("#result");
const playerScoreText = document.querySelector("#player-score");
const computerScoreText = document.querySelector("#computer-score");
const restartBtn = document.createElement("button");
const submitButton = document.getElementById('submitButton');

// *********************** EVENT-LISTENERS *********************** //

submitButton.addEventListener('click', startGame);
rockBtn.addEventListener("click", () => playRound(ROCK));
paperBtn.addEventListener("click", () => playRound(PAPER));
scissorsBtn.addEventListener("click", () => playRound(SCISSORS));

// ************************** FUNCTIONS ************************** //

function startGame() {
  name = document.getElementById('name').value;
}
function playRound(playerSelection) {
  const computerSelection = computerPlay();

  const winner = getWinner(playerSelection, computerSelection);

  if (winner === "player") {
    playerScore++;
    resultText.textContent = `Round ${roundNumber}: You win! ${playerSelection} beats ${computerSelection}`;
  } else if (winner === "computer") {
    computerScore++;
    resultText.textContent = `Round ${roundNumber}: You lose! ${computerSelection} beats ${playerSelection}`;
  } else {
    resultText.textContent = `Round ${roundNumber}: It's a tie! You both chose ${playerSelection}`;
  }

  roundNumber++;

  updateScoreboard();

  if (playerScore >= 3) {
    endGame("Congratulations! You won!");
  } else if (computerScore >= 3) {
    endGame("Computer wins! Better luck next time.");
  }
}

function computerPlay() {
  const choices = [ROCK, PAPER, SCISSORS];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getWinner(playerSelection, computerSelection) {
  if (
    (playerSelection === ROCK && computerSelection === SCISSORS) ||
    (playerSelection === PAPER && computerSelection === ROCK) ||
    (playerSelection === SCISSORS && computerSelection === PAPER)
  ) {
    return "player";
  } else if (
    (computerSelection === ROCK && playerSelection === SCISSORS) ||
    (computerSelection === PAPER && playerSelection === ROCK) ||
    (computerSelection === SCISSORS && playerSelection === PAPER)
  ) {
    return "computer";
  } else {
    return "tie";
  }
}

function updateScoreboard() {
  const playerNameText = document.getElementById('player-score');
  playerNameText.textContent = `${name}: ${playerScore}`;
  const computerScoreText = document.getElementById('computer-score');
  computerScoreText.textContent = `Computer: ${computerScore}`;
}

function endGame(message) {
  resultText.textContent = message;
  rockBtn.disabled = true;
  paperBtn.disabled = true;
  scissorsBtn.disabled = true;
  // Display the result message
  result.textContent = message.replace("You", name);

  // Show the restart button
  restartBtn.style.display = "block";


  restartBtn.textContent = "Restart Game";
  restartBtn.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    roundNumber = 1;
    updateScoreboard();

    resultText.textContent = "";
    rockBtn.disabled = false;
    paperBtn.disabled = false;
    scissorsBtn.disabled = false;

    restartBtn.remove();
  });

  document.querySelector("#game").appendChild(restartBtn);
}