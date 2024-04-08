const frontElement = document.querySelector(".front");
const numberFlipper = document.querySelector(".flipper");
const donkeyImageElement = document.querySelector(".donkey-image");
const messageElement = document.querySelector(".message");
const secretNumberElement = document.querySelector(".secret-number");
const scoreDisplayElement = document.querySelector(".score");
const centerSmileyElement = document.querySelector(".number");
const inputElement = document.querySelector(".guess");
const btnElement = document.querySelector(".check");
const donkeyAudio = new Audio("assets/donkey.mp3");
const bodyElement = document.querySelector("body");
const highestScoreDisplayElement = document.querySelector(".highscore");
let hasWon = false;
highestScoreDisplayElement.textContent = localStorage.getItem("highestScore");
let getHighestScore = Number(highestScoreDisplayElement.textContent);

function playErrorAnimation() {
  frontElement.classList.add("error-animation");
  setTimeout(() => {
    frontElement.classList.remove("error-animation");
  }, 400);
}

function playLostAnimation() {
  centerSmileyElement.classList.add("hide");
  donkeyImageElement.classList.add("show");
  donkeyAudio.play();
}

function revealSecretNumber() {
  numberFlipper.classList.add("reveal");
}

function biggerInput() {
  inputElement.classList.add("guess-animation");
  setTimeout(() => {
    inputElement.classList.remove("guess-animation");
  }, 400);
}
centerSmileyElement.textContent = "😶‍🌫️";

/*******************Génération du nombre secrêt aléatoire ****************/
function getSecretNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let secretNumber = getSecretNumber(1, 20);

console.log(secretNumber);

// Afficher le nombre secret
secretNumberElement.textContent = `${secretNumber}`;

/******************************Check du input value de l'utilisateur au click du bouton Vérifier *******************************/
let score = 20;

function onBtnClick() {
  let setHighestScore;
  if (score === 0) {
    return;
  } else {
    const inputElementValue = inputElement.value;
    biggerInput();

    if (inputElementValue === "") {
      messageElement.textContent = "Il faut préciser un nombre!";
    } else if (
      isNaN(inputElementValue) ||
      inputElementValue === "," ||
      inputElementValue === "e"
    ) {
      messageElement.textContent = "Ceci n'est pas un nombre";
    } else {
      const inputElementValue = Number(inputElement.value);
      if (inputElementValue < 1 || inputElementValue > 20) {
        messageElement.textContent =
          "Vous devez saisir un nombre entre 1 et 20";
      } else {
        if (secretNumber < inputElementValue) {
          playErrorAnimation();
          messageElement.textContent = "Trop grand!";
          --score;
        } else if (secretNumber > inputElementValue) {
          playErrorAnimation();
          messageElement.textContent = "Trop petit!";
          --score;
        } else {
          revealSecretNumber();
          messageElement.textContent = "Vous avez gagné!";
          bodyElement.classList.add("success");
          hasWon = true;
        }
      }
    }
    scoreDisplayElement.textContent = `${score}`;
    if (hasWon && score > getHighestScore) {
      setHighestScore = localStorage.setItem("highestScore", score);
    }

    if (score === 0) {
      messageElement.textContent = "Vous avez perdu";
      playLostAnimation();
      bodyElement.classList.add("fail");
    }
  }
}

/****************************** Reset function *******************************/
function rePlay() {
  score = 20;
  secretNumber = getSecretNumber(1, 20);
  console.log(secretNumber);
  messageElement.textContent = "Commence à deviner...";
  scoreDisplayElement.textContent = `${score}`;
  inputElement.value = "";
  bodyElement.classList.remove("success");
  bodyElement.classList.remove("fail");
  numberFlipper.classList.remove("reveal");
  donkeyImageElement.classList.remove("show");
  centerSmileyElement.classList.remove("hide");
}
/******************************function to handle Highest Score *******************************/
//localStorage.clear();
