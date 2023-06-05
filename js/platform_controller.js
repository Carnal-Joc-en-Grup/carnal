import PlatformScene from "./scenes/platformgame.js";
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
			debug: true
		}
	},
    scene: [ Begin ]
};

var game = new Phaser.Game(config);