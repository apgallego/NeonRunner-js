const runner = document.getElementById("runner");
const obstacle = document.getElementById("obstacle");
let contador = 1;
let distancia = 0;
var timestamp = 300;

function jump() {
  if (runner.classList != "jump") {
    runner.classList.add("jump");

    setTimeout(function () {
      runner.classList.remove("jump");
    }, 500);
  }
}

var animationObstacle = setTimeout(function(){
  obstacle.style.opacity = '1';
  obstacle.style.animation = 'block 1s infinite linear';
}, 2000)
var run = setInterval(runAnimation, timestamp);

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
  if(contador > 4) contador = 1;
  
  distancia++;
  // console.log(distancia);
  if(distancia > 50){
    timestamp = 200;
    clearInterval(run);
    run = setInterval(runAnimation, timestamp);
  }
  if(distancia > 100){
    timestamp = 100;
    clearInterval(run);
    run = setInterval(runAnimation, timestamp);
  }
}

// function obstacleAnimation(){
//   return new Promise((resolve, reject) => {
//     let obsLeft = 0;
//     function step(timestamp) {
//         obsLeft++;
//         obstacle.style.left = '';

//         if (prog < time) {
//             requestAnimationFrame(step);
//         } else {
//             progress.style.width = "100%";
//             resolve(setTimeout(startGame, 1000));
//         }
//     }
//     requestAnimationFrame(step);
//    });
// }

var isAlive = setInterval(function () {
  // get current runner X and Y position
  var runnerTop = parseInt(window.getComputedStyle(runner).getPropertyValue("top"));
  var runnerLeft = parseInt(window.getComputedStyle(runner).getPropertyValue("left"));

  // get current obstacle X and Y position
  var obstacleTop = parseInt(window.getComputedStyle(obstacle).getPropertyValue("top"));
  var obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

  // detect collision
  // if (runnerTop == obstacleTop && runnerLeft == obstacleLeft) {
    // console.log('Runner: x: ' + runnerLeft + ' // y: ' + runnerTop + '\nObstacle: x: ' + obstacleLeft + ' // y: ' + obstacleTop);
  // if (obstacleLeft < 50 && obstacleLeft > 0 && runnerTop >= 140) {
    // collision
    // stopGame();
    // alert('Te has chocado...');
    // }
    
  let runnerCoords = runner.getBoundingClientRect();
  let obstacleCoords = obstacle.getBoundingClientRect();
  // console.log(runnerCoords);
  // console.log(obstacleCoords);
  // console.log(Math.round(obstacleCoords.x));
  if (Math.round(runnerCoords.left) >= Math.round(obstacleCoords.left)
      && Math.round(runnerCoords.left < Math.round(obstacleCoords.left + obstacleCoords.width))){	
        console.log(runnerCoords);
        console.log(obstacleCoords);
        alert('perdiste...');
  } 
}, 10);

function stopGame(){
  obstacle.style.animation = '';
}

document.addEventListener("keydown", function (ev) {
  if(ev.key == 'ArrowUp' || ev.key == 'W' || ev.key == 'w' || ev.code == 'Space') jump();
});
