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
    endGame(`Congratulations, ${playerName}! You won the game!`);
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
// Updates the Scoreboard
function updateScoreboard() {
  const playerNameText = document.getElementById('player-score');
  playerNameText.textContent = `${playerName}: ${playerScore}`;
  const computerScoreText = document.getElementById('computer-score');
  computerScoreText.textContent = `Computer: ${computerScore}`;
}
function endGame(message) {
  resultText.textContent = message; // Set the result text content to the provided message
  resultText.textContent = message.replace("You", playerName); // Replace "You" with the player's name in the message
  // Disables the buttons since round is over
  rockBtn.disabled = true;
  paperBtn.disabled = true;
  scissorsBtn.disabled = true;

  // Show the restart button
  restartBtn.style.display = "block";


  restartBtn.textContent = "Restart Game"; // Set the restart button text to "Restart Game"
  restartBtn.addEventListener("click", () => { // Adds a click event listener to the restart button
    // Resets the playerscore since new round is incoming and sets the round to #1.
    playerScore = 0;
    computerScore = 0;
    roundNumber = 1;
    updateScoreboard(); // Update the scoreboard with the new scores and round number

    resultText.textContent = ""; // Clear the result text content
    // Enables the buttons since round is starting
    rockBtn.disabled = false;
    paperBtn.disabled = false;
    scissorsBtn.disabled = false;

    restartBtn.remove(); // Remove the restart button from the DOM
  });

  document.querySelector("#game").appendChild(restartBtn); // Append the restart button to the game
}
