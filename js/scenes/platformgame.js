"use strict";
import Carnal from "../classes/carnal.js";

var config = {
  width: 800,
  height: 728,
};

const MAP_WIDTH = 950 + config.width;
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
    //Backgrounds
    
    this.load.image("background1", "../../resources/backgrounds/background_passadisPorta.jpg");
    this.load.image("background2", "../../resources/backgrounds/background_passadis.jpg");
    this.load.image("background3", "../../resources/backgrounds/background_ventilacio.jpg");
    this.load.image("background4", "../../resources/backgrounds/background_pati.jpg");

    // Props
    this.load.image("entrada", "../resources/props/entrada.png");
    this.load.image("tuberia_tileset", "../../resources/props/tuberia_tileset.png");
    this.load.image("herb", "../resources/props/herba.png");
    this.load.image("box", "../resources/props/box.png");

    // Icones
    this.load.image("cor", "../resources/icones/cor.png");
    this.load.image("rata", "../resources/icones/rata.png");
    this.load.image("herba", "../resources/icones/herba.png");


    this.load.image("Collision", "../../resources/assets/Collision.png");
    this.load.tilemapTiledJSON("TileMap001", "../../tiled/TileMap001.json");
    
    // Player
    this.load.spritesheet("carnal_walk", "../../resources/carnal_sprites/carnal_walk.png", {frameWidth: 500, frameHeight: 500});
    this.load.spritesheet("carnal_attack", '../../resources/carnal_sprites/carnal_attack.png', {frameWidth: 500, frameHeight: 500});
    this.load.spritesheet("carnal_sneak", '../../resources/carnal_sprites/carnal_sneak.png', {frameWidth: 500, frameHeight: 500});
    this.load.spritesheet("carnal_sneak_attack", '../../resources/carnal_sprites/carnal_sneak_attack.png', {frameWidth: 500, frameHeight: 500});
    this.load.spritesheet("carnal_jump", '../../resources/carnal_sprites/carnal_jump.png', {frameWidth: 500, frameHeight: 500});
    this.load.spritesheet("carnal_wait", '../../resources/carnal_sprites/carnal_wait.png', {frameWidth: 500, frameHeight: 500}); 
    this.load.image("carnal-texture", "../../resources/prueba.png");

    // Personatge
    this.load.spritesheet("paloma_idle", '../../resources/paloma_sprites/paloma_idle.png', {frameWidth: 500, frameHeight: 500}); 

    // Enemics
    this.load.spritesheet("rat_walk", '../../resources/rats_sprites/rat_walk.png', {frameWidth: 343, frameHeight: 142});
  }

  create() {
    // Scene Backgorund
    let bg = this.add.image(config.width / 2, config.height / 2, "background1");
    bg.setScale(0.675);
    //bg.setScrollFactor(0);
    // create the Tilemap
    const map = this.make.tilemap({
      key: "TileMap001",
    });
    const tilesetTuberies = map.addTilesetImage("tuberia_tileset");
    const tilesetCollision = map.addTilesetImage("Collision");

    const layerTuberies = map.createLayer("Tiles", tilesetTuberies);
    const layerCollision = map.createLayer("Collisions", tilesetCollision);
    layerTuberies.setScale(0.2);
    layerCollision.setScale(0.2);
    
    //En Facu havia llevat aquest tros i no es veia es moix per això, no se perquè putes ho lleva
    this.player = new Carnal({
      scene: this, // Passa l'objecte a l'escena actual
      x: 100,
      y: 610,
      texture: "carnal-texture",
      frame: "carnal-frame",
    })

    this.inputKeys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      attack: Phaser.Input.Keyboard.KeyCodes.E,
      interact: Phaser.Input.Keyboard.KeyCodes.Q,
      jump: Phaser.Input.Keyboard.KeyCodes.W,
      sneak: Phaser.Input.Keyboard.KeyCodes.S,
      pause: Phaser.Input.Keyboard.KeyCodes.ESC
    });
    
    this.player.create();

    // Colisions
    this.player.changeHitbox();
    this.physics.add.collider(this.player, layerTuberies);
    this.physics.add.collider(this.player, layerCollision);
    layerTuberies.setCollisionBetween(5, 10);
    layerCollision.setCollisionBetween(10, 12);

    this.cameras.main.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT); // Ajusta els límits de la càmera segons el tamany de l'escena
    this.cameras.main.startFollow(this.player, true, 0.5, 0.5); // Estableix a Carnal com a l'objecte a seguir amb la càmara
  }
  update() {
    if (this.gameOver) return;
    this.player.update();
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
