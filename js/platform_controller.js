import PlatformScene from "./scenes/platformgame.js";


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
    scene: [ PlatformScene ]
};

var game = new Phaser.Game(config);