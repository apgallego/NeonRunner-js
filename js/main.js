// import * as game from 'game.js';

var gameContainer;
var newGameButton, optionsButton, creditsButton;
var opts = [], cres = [];
var neonRunnerText;
var progress, progressBar;
var iframe;

var backbutton;

var music, sounds;

let animationNeonRunnerText;

function main(){
    gameContainer = document.getElementById('gameContainer');
    
    newGameButton = document.getElementById('newGame');
    optionsButton = document.getElementById('options');
    creditsButton = document.getElementById('credits');

    opts = document.getElementsByClassName('opt');
    cres = document.getElementsByClassName('cre');

    backbutton = document.getElementById('back');
    
    progressBar = document.getElementById('progressBar');
    progress = document.getElementById('progress');
    
    neonRunnerText = document.querySelector('.neon-runner-text');
    
    let contadorNeonRunner = 0;
    animationNeonRunnerText = setInterval(() => {
        // console.log(neonRunnerText);
        if(contadorNeonRunner % 2 == 0) neonRunnerText.style.backgroundImage = 'url(../assets/img/misc/neon_runner_1.png)';
        else neonRunnerText.style.backgroundImage = 'url(../assets/img/misc/neon_runner_2.png)';
        contadorNeonRunner++;
        // console.log('skere');
    }, 500);

    newGameButton.addEventListener('mouseover', function(){this.classList.add('selected');});
    newGameButton.addEventListener('mouseout', function(){this.classList.remove('selected');});
    optionsButton.addEventListener('mouseover', function(){this.classList.add('selected');});
    optionsButton.addEventListener('mouseout', function(){this.classList.remove('selected');});
    creditsButton.addEventListener('mouseover', function(){this.classList.add('selected');});
    creditsButton.addEventListener('mouseout', function(){this.classList.remove('selected');});

    newGameButton.addEventListener('click', newGame);
    optionsButton.addEventListener('click', showOptions);
    creditsButton.addEventListener('click', showCredits);

    backbutton.addEventListener('click', back);
}

function newGame(){
    document.getElementById('menu').style.display = 'none'; 
    gameContainer.style.backgroundImage = 'none';
    gameContainer.style.backgroundColor = 'black';
    gameContainer.style.transition = 'background-color 1s';
    neonRunnerText.style.display = 'none';
    document.querySelector('.header').style.display = 'flex';
    clearInterval(neonRunnerText);
    setTimeout( () => {
        progressBar.style.display = 'flex';
        progress.style.display = 'flex';
            progress.style.justifyContent = 'center';
            progress.style.alignItems = 'center';
            progress.innerHTML = '0%';
            setTimeout(loadingAnimation, 1000);
    }, 1000)
}

function startGame(){
    progress.style.display = 'none';
    progressBar.style.display = 'none';
    setTimeout(() => {
        iframe = createNode('iframe', gameContainer, 'neonRunner', 'neon-runner-game', '');
        iframe.frameborder = 0;
        iframe.style.opacity = '1';
        iframe.style.transition = 'opacity 1s';
        iframe.src = './game.html';
    }, 1000);
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

function showOptions(){
    // console.log(this);
    this.style.display = 'none';
    newGameButton.style.display = 'none';
    creditsButton.style.display = 'none';
    // this.removeEventListener('mouseover', function(){this.classList.add('selected');});
    // this.removeEventListener('mouseout', function(){this.classList.remove('selected');});
    this.classList.remove('selected');
    backbutton.style.display = 'block';
    for(let i = 0; i < opts.length; i++){
        opts[i].style.display = 'flex';
        opts[i].addEventListener('mouseover', function(){this.classList.add('selected');});
        opts[i].addEventListener('mouseout', function(){this.classList.remove('selected');});
    }
}

function showCredits(){
    this.style.display = 'none';
    newGameButton.style.display = 'none';
    optionsButton.style.display = 'none';
    // this.removeEventListener('mouseover', function(){this.classList.add('selected');});
    // this.removeEventListener('mouseout', function(){this.classList.remove('selected');});
    this.classList.remove('selected');
    backbutton.style.display = 'block';
    for(let i = 0; i < cres.length; i++){
        cres[i].style.display = 'flex';
        cres[i].addEventListener('mouseover', function(){this.classList.add('selected');});
        cres[i].addEventListener('mouseout', function(){this.classList.remove('selected');});
    }
}

function back(){
    console.log(optionsButton);
    for(let opt of opts) opt.style.display = 'none';
    for(let cre of cres) cre.style.display = 'none';
    optionsButton.style.display = 'block';
    newGameButton.style.display = 'block';
    creditsButton.style.display = 'block';
    backbutton.style.display = 'none';
}

function createNode(tipo, padre, id, clase, inner){
    var nodo = document.createElement(tipo);
    if(id != '') nodo.id = id;
    if(clase != '') nodo.className = clase;
    if(inner != '') nodo.innerHTML = inner;
    padre.appendChild(nodo);
    return nodo;
}

window.onload = main;