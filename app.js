function changeBgColor() {
  const background = document.getElementById("background");

  const getRandomNumber = (maxNum) => {
    return Math.floor(Math.random() * maxNum);
  };

  const getRandomColor = () => {
    const h = getRandomNumber(360);
    const s = getRandomNumber(100);
    const l = getRandomNumber(100);

    return `hsl(${h}deg, ${s}%, ${l}%)`;
  };

  const setBackgroundColor = () => {
    const randomColor = getRandomColor();
    background.style.backgroundColor = randomColor;
    background.style.color = randomColor;
  };

  setBackgroundColor();
}

// ----------------------------

function getComputerChoice() {
  const rpsChoice = ["Rock", "Paper", "Scissors"];
  const randomChoice = Math.floor(Math.random() * 3);
  return rpsChoice[randomChoice];
}

function getResult(playerChoice, computerChoice) {
  let score;
  // 1: win
  // 0: tie
  // -1: lose

  // tie
  if (playerChoice == computerChoice) {
    score = 0;
  }
  // win
  else if (
    (playerChoice == "Rock" && computerChoice == "Scissors") ||
    (playerChoice == "Scissors" && computerChoice == "Paper") ||
    (playerChoice == "Paper" && computerChoice == "Rock")
  ) {
    score = 1;
  }
  // lose
  else {
    score = -1;
  }

  return score;
}

function getPlayerChoice() {
  let choices = document.querySelectorAll(".btn");
  choices.forEach((button) => {
    button.onclick = (e) => {
      onClickPlayerChoice(e);
    };
  });
}

const scores = {
  user: 0,
  computer: 0,
};

function scoreBoard(result) {
  let scoreBoard = document.getElementById("score-board");
  let userPoints = document.getElementById("user-score");
  let computerPoints = document.getElementById("computer-score");
  if (result == 1) {
    scores.user += 1;
  } else if (result == -1) {
    scores.user -= 1;
  }
  userPoints.innerHTML = scores.user;
  computerPoints.innerHTML = scores.computer;
  if (scores.user < scores.computer) {
    scoreBoard.style.color = "red";
  } else if (scores.user > scores.computer) {
    scoreBoard.style.color = "green";
  }
}

function onClickPlayerChoice(e) {
  e.target.style.backgroundColor = "yellow";
  let user_choice = e.target.id;
  let computer_choice = getComputerChoice();
  let result = getResult(user_choice, computer_choice);
  displayUser(user_choice);
  displayComputer(result, e, computer_choice);
}

function displayUser(user_choice) {
  let displayElement = document.getElementById("display");

  const scoreHeading = document.createElement("h1");

  displayElement.appendChild(scoreHeading);

  scoreHeading.classList.add("scoreStyle");

  scoreHeading.textContent = `You Played: ${user_choice}`;
}

function displayComputer(result, e, computer_choice) {
  let displayElement = document.getElementById("display");
  const scoreHeading = document.createElement("h1");
  displayElement.appendChild(scoreHeading);
  scoreHeading.classList.add("scoreStyle");
  scoreHeading.textContent = "and computer playssss...";

  setTimeout(() => {
    if (result == 1) {
      scoreHeading.innerText = `Computer played: ${computer_choice}..... You Won🤩`;
      e.target.style.backgroundColor = "green";
    } else if (result == -1) {
      scoreHeading.innerText = `Computer played: ${computer_choice}..... You Lost😭`;
      e.target.style.backgroundColor = "orangered";
    } else {
      scoreHeading.innerText = `Computer played: ${computer_choice}..... Tie🥲`;
      e.target.style.backgroundColor = "pink";
    }

    scoreBoard(result);
  }, 500);
  setTimeout(() => {
    clear(e);
  }, 2000);
}

getPlayerChoice();

function clear(e) {
  e.target.style.backgroundColor = "";
  document.querySelectorAll(".scoreStyle").forEach((e) => e.remove());
}

//  ----------------------------

const btn = document.getElementById("cheat");
btn.onclick = () => {
  scoreBoard(1);
};
