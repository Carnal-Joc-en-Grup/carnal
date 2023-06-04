"use strict";

const states = {
  idle: 0,
  jump: 1,
  fall: 2,
  land: 3,
  attack: 4,
  sneak: 5,
  sneakAttack: 6,
  damage: 7,
  death: 8,
};

const SPEED = 250;
const JUMP_SPEED = 500;
const SPRITE_SIZE = 500;

export default class Rata extends Phaser.GameObjects.Sprite {
  constructor(data, hp = 1) {
    let { scene, x, y, texture, frame } = data;
    super(scene, x, y, texture, frame);
    // Variables del personatge
    this.hitPoints = hp;
    // this.actualState = states.idle;
    this.isDead = false;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.setScale(0.25);
  }
  create() {
    console.log("Create Rata");
    this.scene.physics.world.enable(this);
    this.body.setBounce(0.1); // Configurar el rebot del jugador

     this.scene.anims.create({
      key: "walk_rata",
      frames: this.scene.anims.generateFrameNumbers("rat_walk", {
        start: 0,
        end: 1,
      }),
      frameRate: 5,
    });
  }
  update() {
    this.anims.play("walk_rata",true);
  }
}
