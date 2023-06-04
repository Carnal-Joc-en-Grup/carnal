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

const SPEED = 250;
const JUMP_SPEED = 300;

export default class Carnal extends Phaser.GameObjects.Sprite {
  constructor(data, hp = 9) {
    let {scene, x, y, texture, frame} = data;
    super(scene, x, y, texture, frame);
    // Variables personaje
    this.hitPoints = hp;
    this.actualState = states.idle;
    this.isDead = false;

    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.setScale(0.25);
    // Ajustar la hitbox sin cambiar el tamaño
    // let width, height, offsetX, offsetY = 250;
    this.body.setSize(240, 240, true);
  }
  create() {
    console.log("Create Carnal");
    this.scene.physics.world.enable(this);
    this.body.setBounce(0.1); // Configurar el rebote del jugador
  }
  preload() {
  }
  update() {
    if (this.scene.inputKeys.left.isDown) {
        this.setFlipX(true);
        this.body.setVelocityX(-SPEED);
    } else if (this.scene.inputKeys.right.isDown) {
        this.setFlipX(false);
        this.body.setVelocityX(SPEED);
    } else {
        this.body.setVelocityX(0);
    }
      if (this.scene.inputKeys.jump.isDown && this.body.onFloor()) { 
        this.body.setVelocityY(-JUMP_SPEED);
    }
  }
}
