var gameContainer; 
var newGameButton,
    optionsButton,
    creditsButton,
    instructionsButton,
    controlsButton,
    musicButton; //main buttons
var music; //music (audio element)
var musicPlaying = false;
var divInfo; //<p> elements where the instructions or the controls will be displayed
var opts = [], cres = []; //arrays with the options and the options of the credits
var progress, progressBar;
var iframe; //iframe where the game will be placed
var backbutton;
let headerTop; //header shown in the upper part of the main container (web component)

function main(){
    //we get all the elements and store them in different variables
    gameContainer = document.getElementById('gameContainer');
    newGameButton = document.getElementById('newGame');
    optionsButton = document.getElementById('options');
    creditsButton = document.getElementById('credits');
    opts = document.getElementsByClassName('opt');
    cres = document.getElementsByClassName('cre');
    instructionsButton = document.getElementById('opt-instructions');
    controlsButton = document.getElementById('opt-controls');
    musicButton = document.getElementById('opt-music');
    music = document.getElementById('music'); //the music too
    backbutton = document.getElementById('back');
    progressBar = document.getElementById('progressBar');
    progress = document.getElementById('progress');
    headerTop = document.getElementById('headerTop');

    //we also create the <p> element where the instructions and the controls will be displayed
    divInfo = createNode('div', gameContainer, 'info', 'info', '');

    //we add listeners to all the 'buttons' (for functionality and style)
    newGameButton.addEventListener('mouseover', function(){this.classList.add('selected');});
    newGameButton.addEventListener('mouseout', function(){this.classList.remove('selected');});
    optionsButton.addEventListener('mouseover', function(){this.classList.add('selected');});
    optionsButton.addEventListener('mouseout', function(){this.classList.remove('selected');});
    creditsButton.addEventListener('mouseover', function(){this.classList.add('selected');});
    creditsButton.addEventListener('mouseout', function(){this.classList.remove('selected');});
    instructionsButton.addEventListener('mouseover', function(){this.classList.add('selected');});
    instructionsButton.addEventListener('mouseout', function(){this.classList.remove('selected');});
    controlsButton.addEventListener('mouseover', function(){this.classList.add('selected');});
    controlsButton.addEventListener('mouseout', function(){this.classList.remove('selected');});
    musicButton.addEventListener('mouseover', function(){this.classList.add('selected');});
    musicButton.addEventListener('mouseout', function(){this.classList.remove('selected');});

    newGameButton.addEventListener('click', newGame);
    optionsButton.addEventListener('click', showOptions);
    creditsButton.addEventListener('click', showCredits);
    instructionsButton.addEventListener('click', showInstructions);
    controlsButton.addEventListener('click', showControls);
    musicButton.addEventListener('click', toggleMusic);

    backbutton.addEventListener('click', back);
}

//function to start the animation after the new game
function newGame(){
    document.getElementById('menu').style.display = 'none'; 
    gameContainer.style.backgroundImage = 'none';
    gameContainer.style.backgroundColor = 'black';
    gameContainer.style.transition = 'background-color 1s';
    document.querySelector('.header-bot').style.display = 'none';
    headerTop.style.display = 'flex';
    setTimeout( () => {
        progressBar.style.display = 'flex';
        progress.style.display = 'flex';
            progress.style.justifyContent = 'center';
            progress.style.alignItems = 'center';
            progress.innerHTML = '0%';
            setTimeout(loadingAnimation, 1000);
    }, 1000)
}

//function that creates the frame where the game is
function startGame(){
    progress.style.display = 'none';
    progressBar.style.display = 'none';
    setTimeout(() => {
        iframe = createNode('iframe', gameContainer, 'neonRunner', 'neon-runner-game', '');
        iframe.frameborder = 0;
        iframe.src = './game.html';
        iframe.style.opacity = '1';
        iframe.style.transition = 'opacity 1s';
    }, 1000);
}

//function that recreates a loading animation with a progress bar
function loadingAnimation() {
    progressBar.style.display = "flex";
    progress.style.display = "flex";
    let time = 2500;
    var start = null;

    return new Promise((resolve, reject) => {
        function step(timestamp) {
            // console.log(start);
            // console.log(timestamp);
            if (!start) start = timestamp;
            var prog = timestamp - start;
            let barProg = ((prog * 100) / time);
            progress.style.width = barProg + "%";
            progress.innerHTML = Math.floor(barProg)  + "%";
            if (prog < time) {
                requestAnimationFrame(step);
            } else {
                progress.style.width = "100%";
                resolve(setTimeout(startGame, 1000));
            }
        }
        requestAnimationFrame(step);
    });
}

//function that shows all the options available and hides the rest of the menu
function showOptions(){
    this.style.display = 'none';
    newGameButton.style.display = 'none';
    creditsButton.style.display = 'none';
    this.classList.remove('selected');
    backbutton.style.display = 'block';
    for(let i = 0; i < opts.length; i++){
        opts[i].style.display = 'flex';
        opts[i].addEventListener('mouseover', function(){this.classList.add('selected');});
        opts[i].addEventListener('mouseout', function(){this.classList.remove('selected');});
    }
}

//function that shows all the options of the credits available and hides the rest of the menu
function showCredits(){
    this.style.display = 'none';
    newGameButton.style.display = 'none';
    optionsButton.style.display = 'none';
    this.classList.remove('selected');
    backbutton.style.display = 'block';
    for(let i = 0; i < cres.length; i++){
        cres[i].style.display = 'flex';
        if(cres[i].id != 'authName'){
            cres[i].addEventListener('mouseover', function(){this.classList.add('selected');});
            cres[i].addEventListener('mouseout', function(){this.classList.remove('selected');});
        }
    }
}

//function that displays the instructions of the game
function showInstructions(){
    document.querySelector('.header-bot').style.display = 'none';
    divInfo.style.display = 'flex';
    divInfo.innerHTML = 'The goal of this game is to jump as many osbtacles as possible so that you get the highest distance!';
}

//function that displays the controls
function showControls(){
    document.querySelector('.header-bot').style.display = 'none';
    divInfo.style.display = 'flex';
    divInfo.innerHTML = 'It\'s simple!<br/><br/>Arrow Up, W or Space to jump!<br/><br/>Once inside the game, you can also use R or Esc to restart the game.';
}

//function that toggles music when clicking the music button (it changes its style too)
function toggleMusic(){
    if(musicPlaying){
        musicPlaying = false;
        music.muted = true;
        musicButton.style.color = 'red';
    } else {
        musicPlaying = true;
        music.load();
        music.muted = false;
        music.volume = 0.05;
        music.play();
        musicButton.style.color = 'white';
    }
}

//function that simulates 'going back' (it hides or displays the necessary elements)
function back(){
    // console.log(optionsButton);
    for(let opt of opts) opt.style.display = 'none';
    for(let cre of cres) cre.style.display = 'none';
    optionsButton.style.display = 'block';
    newGameButton.style.display = 'block';
    creditsButton.style.display = 'block';
    instructionsButton.style.display = 'none';
    controlsButton.style.display = 'none';
    divInfo.style.display = 'none';
    musicButton.style.display = 'none';
    backbutton.style.display = 'none';
    document.querySelector('.header-bot').style.display = 'flex';
}

//function that creates and returns an HTML element, and gives the possibility to add id, class and innerHTML
function createNode(tipo, padre, id, clase, inner){
    var nodo = document.createElement(tipo);
    if(id != '') nodo.id = id;
    if(clase != '') nodo.className = clase;
    if(inner != '') nodo.innerHTML = inner;
    padre.appendChild(nodo);
    return nodo;
}

//when everything loads, main funcion is executed
window.onload = main;