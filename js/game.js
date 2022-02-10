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

var run = setInterval(runAnimation, timestamp);

function runAnimation(){
  switch(contador){
    case 1:
      runner.style.backgroundImage = 'url(../assets/img/sprite_running_1.png)';
      break;
    case 2:
      runner.style.backgroundImage = 'url(../assets/img/sprite_running_2.png)';
      break;
    case 3:
      runner.style.backgroundImage = 'url(../assets/img/sprite_running_3.png)';
      break;
    case 4:
      runner.style.backgroundImage = 'url(../assets/img/sprite_running_4.png)';
      break;
  }
  contador++;
  if(contador > 4) contador = 1;
  
  distancia++;
  console.log(distancia);
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


var isAlive = setInterval(function () {
  // get current runner X and Y position
  var runnerTop = parseInt(window.getComputedStyle(runner).getPropertyValue("top"));
  var runnerLeft = parseInt(window.getComputedStyle(runner).getPropertyValue("left"));

  // get current obstacle X and Y position
  var obstacleTop = parseInt(window.getComputedStyle(obstacle).getPropertyValue("top"));
  var obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

  // detect collision
  if (runnerTop == obstacleTop && runnerLeft == obstacleLeft) {
    // collision
    // stopGame();
    alert('Te has chocado...');
  }
}, 10);

function stopGame(){

}

document.addEventListener("keydown", function (ev) {
  if(ev.key == 'ArrowUp' || ev.key == 'W' || ev.key == 'w' || ev.key == 'Space') jump();
});
