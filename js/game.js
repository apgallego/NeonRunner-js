const runner = document.getElementById("runner");
const obstacle = document.getElementById("obstacle");
let contador = 1;
let distancia = 0;
let aceleracion = 0;
var timestamp = 300;

function jump() {
  if (runner.classList != "jump") {
    runner.classList.add("jump");

    setTimeout(function () {
      runner.classList.remove("jump");
    }, 300);
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
  if(distancia > 20){
    timestamp = 200;
    clearInterval(run);
    run = setInterval(runAnimation, timestamp);
  }
  if(distancia > 40){
    timestamp = 100;
    clearInterval(run);
    run = setInterval(runAnimation, timestamp);
  }
}


var isAlive = setInterval(function () {
  // get current runner Y position
  // var runnerTop = parseInt(window.getComputedStyle(runner).getPropertyValue("top"));

  // get current obstacle X position
  var obstacleLeft = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("left")
  );

  // detect collision
  if (obstacleLeft < 50 && obstacleLeft > 0 && runnerTop >= 140) {
    // collision
    alert("Game Over!");
  }
}, 10);

document.addEventListener("keydown", function (event) {
  jump();
});
