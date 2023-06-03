"use strict";

const states = {
  idle: 0,
  jumping: 1,
  fall: 2,
  land: 3,
  attack: 4,
  sneak: 5,
  sneakAttack: 6,
};

export default class Carnal extends Phaser.GameObjects.Sprite {
  constructor(data, hp = 9) {
    let { scene, x, y, texture, frame } = data;
    super(scene, x, y, texture, frame);
    // Variables personaje
    this.hitPoints = hp;
    this.actualState = states.idle;
    this.isDead = false;

    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.setScale(0.25)
  }
  create() {
    console.log("Create Carnal");
    this.scene.physics.world.enable(this);
    this.body.setCollideWorldBounds(true); // Mantener al jugador dentro de los límites del mundo
    this.body.setBounce(0.2); // Configurar el rebote del jugador
  }
  preload() {
  }
  update() {
    if (this.scene.inputKeys.left.isDown) {
        this.setFlipX(true);
        this.body.setVelocityX(-200);
    } else if (this.scene.inputKeys.right.isDown) {
        this.setFlipX(false);
        this.body.setVelocityX(200);
    } else {
        this.body.setVelocityX(0);
    }
    if (this.scene.inputKeys.jump.isDown && this.body.touching.down) {
        this.body.setVelocityY(-300);
    }
  }
}
