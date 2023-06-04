"use strict";

const states = {
  idle: 0,
  walk: 10,
  jump: 1,
  fall: 2,
  land: 3,
  attack: 4,
  sneak: 5,
  sneakWalk: 6,
  sneakAttack: 7,
  damage: 8,
  death: 9,
};

const SPEED = 250;
const JUMP_SPEED = 500;
const SPRITE_SIZE = 500;
const hitbox = {
  sizeX:50,
  sizeY:50,
}

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
    this.moving = false;
    this.canMove = true;
  }
  create() {
    console.log("Create Carnal");
    this.scene.physics.world.enable(this);
    this.body.setBounce(0.1); // Configurar el rebot del jugador

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
        end: 0,
      }),
      frameRate: 8,
      repeat: 0,
    });
    this.scene.anims.create({
      key: "sneak_walk",
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
      frames: this.scene.anims.generateFrameNumbers("carnal_walk", {
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
    if (this.scene.inputKeys.left.isDown && this.canMove) {
      this.setFlipX(true);
      this.body.setVelocityX(-SPEED);
      this.moving = true;
    } else if (this.scene.inputKeys.right.isDown && this.canMove) {
      this.setFlipX(false);
      this.body.setVelocityX(SPEED);
      this.moving = true;
    } else {
      this.body.setVelocityX(0);
      this.moving = false;
    }

    // if (this.scene.inputKeys.jump.isDown && this.body.onFloor()) {
    //   this.actualState = states.jump;
    //   this.body.setVelocityY(-JUMP_SPEED);
    // } else if (this.body.onFloor()) {
    //   //this.actualState = states.idle;
    // }

    switch (this.actualState) {
      case states.idle: // ----------------------------------- IDLE
        if (this.scene.inputKeys.jump.isDown) {
          this.setState(states.jump);
          break;
        }
        if (this.scene.inputKeys.attack.isDown) {
          this.setState(states.attack);
          break;
        }
        if (this.scene.inputKeys.sneak.isDown) {
          this.setState(states.sneak);
          break;
        }
        if (this.moving) {
          this.setState(states.walk);
          break;
        }
        this.anims.play("idle", true);
        break;
      case states.walk: // ----------------------------------- WALK
        if (this.scene.inputKeys.jump.isDown) {
          this.setState(states.jump);
          break;
        }
        if (this.scene.inputKeys.attack.isDown) {
          this.setState(states.attack);
          break;
        }
        if (this.scene.inputKeys.sneak.isDown) {
          this.setState(states.sneak);
          break;
        }
        if (!this.moving) {
          this.setState(states.idle);
          break;
        }
        this.anims.play("walk", true);
        break;
      case states.attack: // --------------------------------- ATTACK
        this.on("animationcomplete", () => {
          this.setState();
        });
        this.anims.play("attack", true);
        break;
      case states.sneak: // ---------------------------------- SNEAK
        if (!this.scene.inputKeys.sneak.isDown && this.canGetUp()) {
          this.setState();
          break;
        }
        if (this.scene.inputKeys.attack.isDown) {
          this.setState(states.sneakAttack);
          break;
        }
        if (this.moving) {
          this.setState(states.sneakWalk);
          break;
        }
        this.anims.play("sneak", true);
        break;
      case states.sneakWalk: // ------------------------------ SNEAK WALK
        if (!this.scene.inputKeys.sneak.isDown && this.canGetUp()) {
          this.setState();
          break;
        }
        if (this.scene.inputKeys.attack.isDown) {
          this.setState(states.sneakAttack);
          break;
        }
        if (!this.moving) {
          this.setState(states.sneak);
          break;
        }
        this.anims.play("sneak_walk", true);
        break;
      case states.sneakAttack: // ---------------------------- SNEAK ATTACK
        this.on("animationcomplete", () => {
          this.setState(states.sneak);
        });
        this.anims.play("sneak_attack", true);
        break;
      case states.jump: // ----------------------------------- JUMP
        this.on("animationcomplete", () => {
          this.setState(states.fall);
        });
        this.anims.play("jump", true);
        break;
      case states.fall: // ----------------------------------- FALL
        if (this.body.onFloor()) this.setState(states.land);
        this.anims.play("fall", true);
        break;
      case states.land: // ----------------------------------- LAND
        this.anims.play("land", true);
        this.on("animationcomplete", () => {
          this.setState(states.idle);
        });
        break;
      case states.damage: // --------------------------------- DAMAGE
        this.anims.play("damage", true);
        break;
      case states.death: // ---------------------------------- DEATH
        this.anims.play("death", true);
        break;
    }
  }
  changeHitbox() {
    if (this.actualState == 5 || this.actualState == 6) {
      // Sneak
      this.body.setSize(300, 150, true);
      this.body.setOffset(125, 300);
    } else {
      this.body.setSize(300, 300, true);
      this.body.setOffset(125, 150);
    }
  }
  setState(newState = states.idle) {
    this.actualState = newState;
    this.changeHitbox();
  }
  canGetUp() {
    return true;
  }
}
