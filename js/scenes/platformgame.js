"use strict";
import Carnal from "../classes/carnal.js";

var config = {
  width: 800,
  height: 728,
};

const MAP_WIDTH = 1894 + config.width;
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
    this.load.image("entrada_ventilacio", "../../resources/props/entrada_tileset.png");
    this.load.image("tuberia_tileset", "../../resources/props/tuberia_tileset.png");
    this.load.image("herba", "../../resources/props/herba_tileset.png");
    this.load.image("caixa", "../../resources/props/box_tileset.png");

    // Icones
    this.load.image("cor", "../resources/icones/cor.png");
    this.load.image("rata", "../resources/icones/rata.png");
    this.load.image("herba", "../resources/icones/herba.png");


    this.load.image("Collision", "../../resources/assets/Collision.png");
    this.load.tilemapTiledJSON("TileMap001", "../../tiled/TileMap001.json");
    this.load.tilemapTiledJSON("TileMap003", "../../tiled/TileMap003.json");
    
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
    let bg = this.add.image(MAP_WIDTH / 2, config.height / 2, "background1");
    let bg2 = this.add.image(MAP_WIDTH, config.height / 2, "background2");
    bg.setScale(0.675); bg2.setScale(0.675);
    //bg.setScrollFactor(0);
    // create the Tilemap
    const map = this.make.tilemap({
      key: "TileMap003",
    });
    
    const tilesetTuberies = map.addTilesetImage("tuberia_tileset");
   const tilesetHerba = map.addTilesetImage("herba");
   const tilesetVentilacio = map.addTilesetImage("entrada_ventilacio");
    const tilesetCollision = map.addTilesetImage("Collision");
   const tilesetBox = map.addTilesetImage("caixa")

    const layerTiles = map.createLayer("Tiles", [tilesetTuberies, tilesetHerba, tilesetVentilacio, tilesetBox]);
    const layerCollision = map.createLayer("Collisions", tilesetCollision);
  

    // He copiat es setScale(0.2) per a tots però no se si ha de ser així

    layerTiles.setScale(0.2);
    layerCollision.setScale(0.2);
    
    //En Facu havia llevat aquest tros i no es veia es moix per això, no se perquè ha ha llevat però així funciona
    this.player = new Carnal({
      scene: this, // Passa l'objecte a l'escena actual
      x: 100,
      y: 610,
      texture: "carnal-texture",
      frame: "carnal-frame",
    })
    //

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

    // Suposo que una cosa com s'herba no hauria de tenir colisions, sinó que en tocar-la o en entrar dins sa seva àrea l'hauria d'adquirir. De moment té colisions perquè uwu

    // Colisions
    this.player.changeHitbox();
    this.physics.add.collider(this.player, layerTiles);
    this.physics.add.collider(this.player, layerCollision);

    layerTiles.setCollisionBetween(5, 23);
    layerCollision.setCollisionBetween(11, 11);

    this.cameras.main.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT); // Ajusta els límits de la càmera segons el tamany de l'escena
    this.cameras.main.startFollow(this.player, true, 0.5, 0.5); // Estableix a Carnal com a l'objecte a seguir amb la càmara
  }
  update() {
    if (this.gameOver) return;
    this.player.update();
  }
  collectHerba(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText("Score: " + this.score);
    if (this.herba.countActive(true) === 0) {
      this.enableAllherba();
      this.createBomb();
    }
  }
}
