let $start = document.querySelector("#start");
let $game = document.querySelector("#game");
let $time = document.querySelector("#time");
let $timeHeader = document.querySelector("#time-header");
let $resultHeader = document.querySelector("#result-header");
let $result = document.querySelector("#result");
let $gameTime = document.querySelector("#game-time"); //забираем инпут

let score = 0;
let isGameStarted = false;

$start.addEventListener("click", startGame);
$game.addEventListener("click", hendelBoxClick);
$gameTime.addEventListener("input", setGameTime); //при вводе текста в инпут будет вызываться эта ф-ция

function startGame() {
  score = 0;
  setGameTime();
  $gameTime.setAttribute("disabled", "true"); //заблокируем инпут при старте игры
  $timeHeader.classList.remove("hide");
  $resultHeader.classList.add("hide");

  isGameStarted = true;
  $start.classList.add("hide");
  $game.style.backgroundColor = "#ffffff";

  let interval = setInterval(function () {
    let time = parseFloat($time.textContent);

    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);

  renderBox();
}

function setGameScore() {
  $result.textContent = score.toString();
}

function setGameTime() {
  // let time = 5;
  let time = +$gameTime.value; //какое число мы введем в инпут, столько и будет отображаться в контенте и играться
  $time.textContent = time.toFixed(1);
}

function endGame() {
  isGameStarted = false;
  setGameScore();
  $gameTime.removeAttribute("disabled"); //разблокируем инпут после окончания игры
  $start.classList.remove("hide");
  $game.style.backgroundColor = "#ccc";
  $game.innerHTML = " ";
  $timeHeader.classList.add("hide");
  $resultHeader.classList.remove("hide");
}

function hendelBoxClick(event) {
  if (!isGameStarted) {
    return;
  }

  if (event.target.dataset.box) {
    score++;
    renderBox();
  }
}

function renderBox() {
  $game.innerHTML = "";

  let box = document.createElement("div");
  let boxSize = getRandom(30, 100);
  let gameSize = $game.getBoundingClientRect();
  let maxTop = gameSize.height - boxSize;
  let maxLeft = gameSize.width - boxSize;

  box.style.height = box.style.width = boxSize + "px";
  box.style.position = "absolute";
  box.style.backgroundColor = "#000000";
  box.style.top = getRandom(0, maxTop) + "px";
  box.style.left = getRandom(0, maxLeft) + "px";
  box.style.cursor = "pointer";
  box.setAttribute("data-box", "true");
  $game.insertAdjacentElement("afterbegin", box);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
