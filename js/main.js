// import * as game from 'game.js';

var gameContainer;
var newGameButton, optionsButton, creditsButton;
var progress, progressBar;

function main(){
    gameContainer = document.getElementById('gameContainer');

    newGameButton = document.getElementById('newGame');
    optionsButton = document.getElementById('options');
    creditsButton = document.getElementById('credits');

    progressBar = document.getElementById('progressBar');
    progress = document.getElementById('progress');

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
    }, 1000)
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
                resolve(setTimeout(startGame, 10));
            }
        }
        requestAnimationFrame(step);
    });
}

function startGame(){
    progress.style.display = 'none';
    progressBar.style.display = 'none';
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

// function keyPressedMenu(ev){
//     switch(ev.key){
//         case 'w':
//         case 'W':
//         case 'ArrowUp':
//              //
//             break;
//         case 'a':
//         case 'A':
//         case 'ArrowLeft':
//             //
//             break;
//         case 's':
//         case 'S':
//         case 'ArrowDown':
//             //
//             break;
//         case 'd':
//         case 'D':
//         case 'ArrowRight':
//             //
//             break;
//         case 'Enter':
//         case 'Space':
//             //
//             break;
//     }
// }

window.onload = main;