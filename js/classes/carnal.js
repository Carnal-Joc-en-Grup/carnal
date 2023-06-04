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

export default class Carnal extends Phaser.GameObjects.Sprite {
  constructor(data, hp = 9) {
    let { scene, x, y, texture, frame } = data;
    super(scene, x, y, texture, frame);
    // Variables del personatge
    this.hitPoints = hp;
    this.actualState = states.idle;
    this.isDead = false;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.setScale(0.25);
  }
  create() {
    console.log("Create Carnal");
    this.scene.physics.world.enable(this);
    this.body.setBounce(0.1); // Configurar el rebot del jugador

    // En Facu tenia lo que no està comentat. He afeigit tot lo que està comentat a partir d'aquí, es a dir sa resta d'estats i ses seves animacions

    this.scene.anims.create({
      key: "walk",
      frames: this.scene.anims.generateFrameNumbers("carnal_walk", {
        start: 0,
        end: 4,
      }),
      frameRate: 8,
      repeat: 0,
    });
    this.scene.anims.create({
      key: "attack",
      frames: this.scene.anims.generateFrameNumbers("carnal_attack", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: 0,
    });
    this.scene.anims.create({
      key: "sneak",
      frames: this.scene.anims.generateFrameNumbers("carnal_sneak", {
        start: 0,
        end: 2,
      }),
      frameRate: 8,
      repeat: 0,
    });
    this.scene.anims.create({
      key: "sneak_attack",
      frames: this.scene.anims.generateFrameNumbers("carnal_sneak_attack", {
        start: 0,
        end: 2,
      }),
      frameRate: 8,
      repeat: 0,
    });
    this.scene.anims.create({
      key: "jump",
      frames: this.scene.anims.generateFrameNumbers("carnal_jump", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: 0,
    });
    this.scene.anims.create({
      key: "fall",
      frames: this.scene.anims.generateFrameNumbers("carnal_jump", {
        start: 4,
        end: 4,
      }),
      frameRate: 8,
    });
    this.scene.anims.create({
      key: "land",
      frames: this.scene.anims.generateFrameNumbers("carnal_jump", {
        start: 5,
        end: 7,
      }),
      frameRate: 8,
      repeat: 0,
    });
    this.scene.anims.create({
      key: "idle",
      frames: this.scene.anims.generateFrameNumbers("carnal_idle", {
        start: 0,
        end: 0,
      }),
      frameRate: 0,
    });
    this.scene.anims.create({
      key: "damage",
      frames: this.scene.anims.generateFrameNumbers("carnal_damage", {
        start: 0,
        end: 0,
      }),
      frameRate: 0,
    });
    this.scene.anims.create({
      key: "death",
      frames: this.scene.anims.generateFrameNumbers("carnal_death", {
        start: 0,
        end: 0,
      }),
      frameRate: 0,
    });
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
      this.actualState = states.jump;
      this.body.setVelocityY(-JUMP_SPEED);
    } else if (this.body.onFloor()) {
      this.actualState = states.idle;
    }

    switch (this.actualState) {
      case states.idle:
        this.anims.play("idle", true);
        break;
      //case states.walk:
      //  this.anims.play("walk", true);
      //  break;
      //case states.attack:
      //  this.anims.play("attack", false);
      //  break;
      //case states.sneak:
      //  this.anims.play("sneak", true);
      //  break;
      //case states.sneakAttack:
      //  this.anims.play("sneak_attack", false);
      //  break;
      case states.jump:
        this.anims.play("jump", true);
        this.on("ANIMATION_COMPLETE", () => {
          console.log("AnimationComplete!!!");
          this.actualState = states.fall;
        });
        break;
      case states.fall:
        this.anims.play("fall", false);
        break;
      //case states.land:
      //  this.anims.play("land", false);
      //  break;
      //case states.damage:
      //  this.anims.play("damage", false);
      //  break;
      //case states.death:
      //  this.anims.play("death", false);
      //  break;
    }
  }
  changeHitbox() {
    if (this.actualState == 5 || this.actualState == 6) {
      // Sneak
      this.body.setSize(240, 350, true);
      this.body.setOffset(125, 125);
    } else {
      this.body.setSize(300, 300, true);
      this.body.setOffset(125, 150);
    }
  }
}
