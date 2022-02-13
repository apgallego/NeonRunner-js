// import * as game from 'game.js';

var gameContainer;
var newGameButton, optionsButton, creditsButton;
var progress, progressBar;
var iframe;
// var player, background, floor;

function main(){
    gameContainer = document.getElementById('gameContainer');

    newGameButton = document.getElementById('newGame');
    optionsButton = document.getElementById('options');
    creditsButton = document.getElementById('credits');

    progressBar = document.getElementById('progressBar');
    progress = document.getElementById('progress');

    // player = document.getElementById('player');
    // background = document.getElementById('background');
    // floor = document.getElementById('floor');

    newGameButton.addEventListener('mouseover', function(){this.classList.add('selected');});
    newGameButton.addEventListener('mouseout', function(){this.classList.remove('selected');});
    optionsButton.addEventListener('mouseover', function(){this.classList.add('selected');});
    optionsButton.addEventListener('mouseout', function(){this.classList.remove('selected');});
    creditsButton.addEventListener('mouseover', function(){this.classList.add('selected');});
    creditsButton.addEventListener('mouseout', function(){this.classList.remove('selected');});

    newGameButton.addEventListener('click', newGame);
    optionsButton.addEventListener('click', options);
    creditsButton.addEventListener('click', credits);

    // newGameButton.addEventListener('keydown', keyPressedMenu);
    // optionsButton.addEventListener('keydown', keyPressedMenu);
    // creditsButton.addEventListener('keydown', keyPressedMenu);
}

function newGame(){
    // console.log(progress);
    // console.log(progressBar);
    document.getElementById('menu').style.display = 'none'; 
    gameContainer.style.backgroundColor = 'black';
    gameContainer.style.transition = 'background-color 1s';
    setTimeout( () => {
        progressBar.style.display = 'flex';
        progress.style.display = 'flex';
            progress.style.justifyContent = 'center';
            progress.style.alignItems = 'center';
            progress.innerHTML = '0%';
            setTimeout(loadingAnimation, 10);
    }, 10)
}

function startGame(){
    progress.style.display = 'none';
    progressBar.style.display = 'none';
    setTimeout(() => {
        iframe = crearNodo('iframe', gameContainer, 'neonRunner', 'neon-runner', '');
        iframe.frameborder = 0;
        iframe.style.opacity = '1';
        iframe.style.transition = 'opacity 1s';
        iframe.src = './game.html';
    }, 10);
}

function loadingAnimation() {
    progressBar.style.display = "flex";
    progress.style.display = "flex";
    let time = 2500;
    var start = null;

    return new Promise((resolve, reject) => {
        function step(timestamp) {
            if (!start) start = timestamp;
            var prog = timestamp - start;
            let barProg = ((prog * 100) / time);
            progress.style.width = barProg + "%";
            progress.innerHTML = Math.floor(barProg)  + "%";

            if (prog < time) {
                requestAnimationFrame(step);
            } else {
                progress.style.width = "100%";
                resolve(setTimeout(startGame, 1));
            }
        }
        requestAnimationFrame(step);
    });
}

function options(){
    newGameButton.style.display = 'none';
    creditsButton.style.display = 'none';
    this.removeEventListener('mouseover', function(){this.classList.add('selected');});
    this.removeEventListener('mouseout', function(){this.classList.remove('selected');});
    let opts = optionsButton.children;
    for(let i = 0; i < opts.length; i++){
        opts[i].style.display = 'flex';
        opts[i].addEventListener('mouseover', function(){this.classList.add('selected');});
        opts[i].addEventListener('mouseout', function(){this.classList.remove('selected');});
    }
}

function crearNodo(tipo, padre, id, clase, inner){
    var nodo = document.createElement(tipo);
    if(id != '') nodo.id = id;
    if(clase != '') nodo.className = clase;
    if(inner != '') nodo.innerHTML = inner;
    padre.appendChild(nodo);
    return nodo;
}

window.onload = main;