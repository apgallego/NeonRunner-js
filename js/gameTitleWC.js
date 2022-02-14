class GameTitle extends HTMLElement {
    constructor () {
      super ();      
    }
	
	connectedCallback(){
	  let num = 0;	
	  setInterval (() => {
        this.style.backgroundImage = ++num % 2 ? 'url(../assets/img/misc/neon_runner_1.png)' : 'url(../assets/img/misc/neon_runner_2.png)';
      }, 1000);
	}	
}

customElements.define ('game-title', GameTitle);