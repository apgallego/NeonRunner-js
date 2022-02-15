const game = document.querySelector('.game');
const runner = document.getElementById("runner");
const obstacle = document.getElementById("obstacle");

var gameOver = true;
let contador = 1;
let distancia = 0;
var timestamp = 100;
var obstacleSpeed = 1;
var score;
var bgGameOverAnim, gameOverAnim;
var jumpFX = document.getElementById('jumpFX');
var gameOverFX = document.getElementById('gameOverFX');

var pannel = document.querySelector('.pannel');
pannel.addEventListener('click', clickStart);

//function that starts the game when clicking the pannel
function clickStart(){
  this.style.display = 'none';
  score.style.opacity = '1';
  score.style.color = 'white';
  score.style.transition = 'opacity 1.5s';
  setTimeout(function(){
    gameOver = false;
    obstacle.style.opacity = '1';
    obstacle.style.animation = `obstacle ${obstacleSpeed}s infinite linear`;
  }, 2000)
}

//function that automatically updates the score
function updateScore(){
  // console.log('updateScore');
  distancia = distancia.toString();
  if(distancia.length == 1) distancia = '000' + distancia;
  if(distancia.length == 2) distancia = '00' + distancia;
  if(distancia.length == 3) distancia = '0' + distancia;
  score.style.fontFamily = 'pixel';
  score.innerHTML = distancia + 'm';
}

//function for the jump animation
function jump() {
  if (runner.classList != 'jump') {
    runner.classList.add('jump');
    jumpFX.load();
    jumpFX.volume = 0.03;
    jumpFX.play();
    setTimeout(function () {
      runner.classList.remove('jump');
    }, 500);
  }
}

//interval to repeat the run animation
var run = setInterval(runAnimation, timestamp);

//function that recreates the run animation by changing sprites (it does it once, so we need the previous interval to loop it)
function runAnimation(){
  switch(contador){
    case 1:
      runner.style.backgroundImage = 'url(../assets/img/sprites/sprite_running_1.png)';
      break;
    case 2:
      runner.style.backgroundImage = 'url(../assets/img/sprites/sprite_running_2.png)';
      break;
    case 3:
      runner.style.backgroundImage = 'url(../assets/img/sprites/sprite_running_3.png)';
      break;
    case 4:
      runner.style.backgroundImage = 'url(../assets/img/sprites/sprite_running_4.png)';
      break;
  }
  contador++;
  if(!gameOver){
    distancia++;
    if(distancia % 20 == 0 && distancia <= 1000){
      // console.log('check speed');
      obstacleSpeed -= 0.001;
      obstacle.style.animation = `obstacle ${obstacleSpeed}s infinite linear`;
    }
  }
  score = document.getElementById('score');
  updateScore();

  if(contador >= 4) contador = 1;
}

//interval that checks if the player is alive, detects collisions and, if so, stops the game
var isAlive = setInterval(function () {
  /* get current runner X and Y position */
  // var runnerTop = parseInt(window.getComputedStyle(runner).getPropertyValue("top"));
  // var runnerLeft = parseInt(window.getComputedStyle(runner).getPropertyValue("left"));
  
  /* get current obstacle X and Y position */
  // var obstacleTop = parseInt(window.getComputedStyle(obstacle).getPropertyValue("top"));
  // var obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
  
  /* using this function you can get much more data from the element */
  var runnerCoords = runner.getBoundingClientRect();
  var obstacleCoords = obstacle.getBoundingClientRect();

  // detect collision
  if (obstacleCoords.left < 120 && obstacleCoords.left > 0 && runnerCoords.top >= 300) {
    //collision
    stopGame()
    .then( () => {
      // console.log('then');
      // clearTimeout(gameOverAnim);
      clearInterval(bgGameOverAnim);
      // runner.classList.remove('gameOver'):
      let gameElems = game.childNodes;
      for(let i = 0; i < gameElems; i++) gameElems.style.display = 'none';
      gameOverFX.load();
      gameOverFX.play();
      pannel.style.display = 'flex';
      pannel.style.color = 'red';
      pannel.style.cursor = 'default';
      pannel.innerHTML = 'GAME OVER';
      document.querySelector('.restart').style.display = 'flex';
      document.querySelector('.restart').addEventListener('click', () => location.reload());
      pannel.removeEventListener('click', clickStart);
    }).catch(err => alert(err));
  }
}, 10);

//function that stops the game
function stopGame(){
  gameOver = true;  
  runner.classList.remove('jump');
  clearInterval(run);
  runner.style.animation = '';
  obstacle.style.animation = '';
  obstacle.style.visibility = 'hidden';
  game.style.backgroundImage = 'none';
  game.style.backgroundColor = '#000';
  let contGameOver = 1;
  bgGameOverAnim = setInterval(function() {
    if(contGameOver % 2 == 0) game.style.backgroundImage = 'url(../assets/img/sprites/game_over.png)';
    else game.style.backgroundImage = 'none';
    contGameOver++;
    // console.log(contGameOver);
    // console.log('after contGameOver');
  }, 200);
  return new Promise((resolve, reject) => {
    gameOverAnim = setTimeout( () => {
      // console.log('before promise');
      runner.style.backgroundImage = 'url(../assets/img/sprites/dead.png)';
      runner.classList.add('gameOver');
      runner.style.top = '600px';
      clearInterval(isAlive);
      // console.log('promise');
      resolve(gameOverAnim);
    }, 2000);
  })
}

//events required to play the game
document.addEventListener("keydown", function (ev) {
  if(ev.key == 'R' || ev.key == 'r' || ev.key == 'Escape') location.reload();
  if(!gameOver)
    if(ev.key == 'ArrowUp' || ev.key == 'W' || ev.key == 'w' || ev.code == 'Space') jump();
});
