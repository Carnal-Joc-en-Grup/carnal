"use strict";
import Carnal from "../classes/carnal.js";

var config = {
    width: 800,
    height: 728
};

const MAP_WIDTH = 950+config.width;
const MAP_HEIGHT = 728;

export default class PlatformScene extends Phaser.Scene {
  constructor() {
    super("PlatformScene");
    this.platforms = null;
    this.player = null;
    this.cursors = null;
    this.herb = null;
    this.score = 0;
    this.scoreText;
    this.bombs = null;
    this.gameOver = false;
  }
  preload() {
    // Carnal.preload(this);
    this.load.image("herb", "../resources/props/herba.png");
    this.load.image("background", "../../resources/backgrounds/background_passadisPorta.jpg");
    this.load.image("tuberia_tileset", "../../resources/props/tuberia_tileset.png");
    this.load.image("Collision", "../../resources/assets/Collision.png");
    this.load.image("carnal-texture", "../../resources/prueba.png");

    this.load.tilemapTiledJSON("TileMap001", "../../tiled/TileMap001.json");
  }
  create() {
	// Scene Backgorund
	let bg = this.add.image(config.width/2, config.height/2, 'background');
	bg.setScale(0.675);
	//bg.setScrollFactor(0);
    // create the Tilemap
    const map = this.make.tilemap({
		key: "TileMap001"

	});
    const tilesetTuberias = map.addTilesetImage("tuberia_tileset");
    const tilesetCollision = map.addTilesetImage("Collision");

    const layerTuberias = map.createLayer("Tiles", tilesetTuberias);
	const layerCollision = map.createLayer("Collisions", tilesetTuberias);
	layerTuberias.setScale(0.2);
	layerCollision.setScale(0.2);

	
    this.inputKeys = this.input.keyboard.addKeys({
		up: Phaser.Input.Keyboard.KeyCodes.UP,
		left: Phaser.Input.Keyboard.KeyCodes.LEFT,
		right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
		attack: Phaser.Input.Keyboard.KeyCodes.S,
		interact: Phaser.Input.Keyboard.KeyCodes.D,
		jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
		sneak: Phaser.Input.Keyboard.KeyCodes.A,
	});
    this.player = new Carnal({
      scene: this, // Pasa el objeto de escena actual
      x: 0,
      y: 0,
      texture: "carnal-texture",
      frame: "carnal-frame",
    });
    this.player.create();

	// Colisiones
	this.physics.add.collider(this.player, layerTuberias);
	this.physics.add.collider(this.player, layerCollision);
	layerTuberias.setCollisionBetween(5,10);
	layerCollision.setCollisionBetween(10,12);

	this.cameras.main.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT); // Ajusta los límites de la cámara según el tamaño de tu escena
	this.cameras.main.startFollow(this.player, true, 0.5, 0.5); // Establece a Carnal como el objeto a seguir en la cámara
  
  }
  update() {
    if (this.gameOver) return;
    this.player.update();
	console.log(this.cameras.main.scrollX)
  }
  collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText("Score: " + this.score);
    if (this.herb.countActive(true) === 0) {
      this.enableAllherb();
      this.createBomb();
    }
  }
}
