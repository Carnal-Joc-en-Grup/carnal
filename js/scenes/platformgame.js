"use strict";

import Carnal from "../classes/carnal.js";

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
    this.load.image('carnal-texture', '../../resources/prueba.png');
  }
  create() {
    this.player = new Carnal({
        scene: this, // Pasa el objeto de escena actual
        x: 0,
        y: 0,
        texture: 'carnal-texture',
        frame: 'carnal-frame'
	});
	this.player.create();
    this.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      attack: Phaser.Input.Keyboard.KeyCodes.S,
      interact: Phaser.Input.Keyboard.KeyCodes.D,
      jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
      sneak: Phaser.Input.Keyboard.KeyCodes.A,
    });
    // 	this.add.image(400, 300, 'sky');
    // 	{	// Creem platafomres
    // 		this.platforms = this.physics.add.staticGroup();
    // 		this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    // 		this.platforms.create(600, 400, 'ground');
    // 		this.platforms.create(50, 250, 'ground');
    // 		this.platforms.create(750, 220, 'ground');
    // 	}
    // 	{	// Creem player i definim animacions
    // 		this.player = this.physics.add.sprite(100, 450, 'dude');
    // 		this.player.setBounce(0.2);
    // 		this.player.setCollideWorldBounds(true);

    // 		this.anims.create({
    // 			key: 'left',
    // 			frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    // 			frameRate: 10,
    // 			repeat: -1
    // 		});

    // 		this.anims.create({
    // 			key: 'turn',
    // 			frames: [ { key: 'dude', frame: 4 } ],
    // 			frameRate: 20
    // 		});

    // 		this.anims.create({
    // 			key: 'right',
    // 			frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    // 			frameRate: 10,
    // 			repeat: -1
    // 		});
    // 	}
    // 	{	// Creem objectes interactuables
    // 		this.herb = this.physics.add.group({
    // 			key: 'star',
    // 			repeat: 11,
    // 			setXY: { x: 12, y: 0, stepX: 70 }
    // 		});
    // 		this.herb.children.iterate((child) =>
    // 			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)));
    // 	}
    // 		this.bombs = this.physics.add.group(); // Grup d'enemics
    // 		this.createBomb();
    // 	{	// Definim les col·lisions i interaccions
    // 		this.physics.add.collider(this.player, this.platforms);
    // 		this.physics.add.collider(this.herb, this.platforms);
    // 		this.cursors = this.input.keyboard.createCursorKeys();
    // 		this.physics.add.overlap(this.player, this.herb,
    // 			(body1, body2)=>this.collectStar(body1, body2));
    // 		this.physics.add.collider(this.bombs, this.platforms);
    // 		this.physics.add.collider(this.player, this.bombs,
    // 			(body1, body2)=>this.hitBomb(body1, body2));
    // 	}
    // 	{ // UI
    // 		this.scoreText = this.add.text(16, 16, 'Score: 0',
    // 			{ fontSize: '32px', fill: '#000' });
    // 	}
  }
  update() {
    if (this.gameOver) return;
	this.player.update();
    // { // Moviment
    // 	if (this.cursors.left.isDown){
    // 		this.player.setVelocityX(-160);
    // 		this.player.anims.play('left', true);
    // 	}
    // 	else if (this.cursors.right.isDown){
    // 		this.player.setVelocityX(160);
    // 		this.player.anims.play('right', true);
    // 	}
    // 	else{
    // 		this.player.setVelocityX(0);
    // 		this.player.anims.play('turn');
    // 	}

    // 	if (this.cursors.up.isDown && this.player.body.touching.down)
    // 		this.player.setVelocityY(-330);
    // }
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
