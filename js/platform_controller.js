import Nivell1 from "./scenes/platformgame.js";
import Nivell3 from "./scenes/nivell3.js";
import Nivell2 from "./scenes/nivell2.js";
import Pause from "./scenes/pauseScene.js";
import Begin from "./scenes/begin.js";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 728,
	backgroundColor: '#bec4ed',
	type: Phaser.AUTO,
    parent: 'game_area',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 350},
			debug: false
		}
	},
    scene: [ Nivell1, Nivell2, Nivell3, Pause ],
};

var game = new Phaser.Game(config);
game.config.vides = 9;
game.config.ratesMatades = 0;
game.config.started = false;
if(localStorage.getItem("carregar")==1){
	console.log("Carregar partida");
	var data = JSON.parse(localStorage.getItem("partida"));
	if(data.escena=="Nivell1") localStorage.setItem("carregar",0);
	else{
		game.config.vides = data.vides;
		game.config.ratesMatades = data.rates;
		game.config.escena = data.escena;

	}

}
