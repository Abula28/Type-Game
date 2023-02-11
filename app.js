"use strict";

import words from "./words.json" assert { type: "json" };

window.onload = () => {
  const typingTxt = document.querySelector(".typing-txt");
  const input = document.querySelector(".textInp");
  const score = document.querySelector(".score");
  const timer = document.querySelector(".timer");
  const gameOver = document.querySelector(".gameOver");
  const highScore = document.querySelector(".highScore");
  const restartBtn = document.querySelector(".restart");

  let scoreCounter = 0;
  let randomWords = null;
  let timerCounter = 32;
  let timerInterval = 1000;
  let interval = setInterval(startTimer, timerInterval);
  let highScoreCounter = 0;

  function generateWord() {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    randomWords = words[Math.floor(Math.random() * words.length)];
    typingTxt.innerHTML = randomWords;
    typingTxt.style.color = `#${randomColor}`;
  }
  generateWord();

  input.addEventListener("keyup", function () {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    input.style.color = `#${randomColor}`;
    if (input.value === randomWords) {
      input.value = "";
      scoreCounter++;
      score.innerHTML = scoreCounter;
      generateWord();
    }
  });

  function startTimer() {
    timerCounter--;
    timer.innerHTML = timerCounter;

    if(timerCounter == 30){
        timer.classList.add('timerAnim')
        setTimeout(() => {
          timer.classList.remove('timerAnim')
        }, 2000);
    }else if(timerCounter <= 10){
      timer.classList.add('timerAnim')
    }
    if (timerCounter == 0) {
      gameStop();
    }
  }

  function gameStop() {
    clearInterval(interval);
    highScoreCounter = scoreCounter;
    highScore.innerHTML = highScoreCounter;
    gameOver.classList.add("active");
  }

  restartBtn.addEventListener("click", restartGame);

  function restartGame() {
    window.location = "index.html";
  }
};
