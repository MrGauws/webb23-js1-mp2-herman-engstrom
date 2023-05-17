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
let playerName = "";
function startGame(event) {
  event.preventDefault(); // Prevent form submission from refreshing the page
  playerName = document.getElementById('name').value;
  updateScoreboard(); // Update the scoreboard with the player's name
}
function playRound(playerSelection) {
  const computerSelection = computerPlay();

  const winner = getWinner(playerSelection, computerSelection);

  // Display player and computer choices
  resultText.textContent = 'Round ' + roundNumber + ': ' + playerName + ' chose ' + playerSelection + ', Computer chose ' + computerSelection + '. ';
  
  if (winner === "player") {
    playerScore++;
    resultText.textContent += `You win! ${playerSelection} beats ${computerSelection}`;
  } else if (winner === "computer") {
    computerScore++;
    resultText.textContent += `Computer wins! ${computerSelection} beats ${playerSelection}`;
  } else {
    resultText.textContent += `It's a tie! You both chose ${playerSelection}`;
  }

  roundNumber++;

  updateScoreboard();

  if (playerScore >= 3) {
    endGame(`Congratulations, ${name}! You won the game!`);
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
  playerNameText.textContent = `${playerName}: ${playerScore}`;
  const computerScoreText = document.getElementById('computer-score');
  computerScoreText.textContent = `Computer: ${computerScore}`;
}

function endGame(message) {
  resultText.textContent = message;
  resultText.textContent = message.replace("You", name);
  rockBtn.disabled = true;
  paperBtn.disabled = true;
  scissorsBtn.disabled = true;

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
