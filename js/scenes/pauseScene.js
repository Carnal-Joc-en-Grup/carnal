export default class Pause extends Phaser.Scene {
    constructor() {
        super("Pause");
    }
    preload(){

    }
    create(){
        let { width, height } = this.sys.game.canvas;
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.add.rectangle(this.canvasWidth/2, this.canvasHeight/2, this.canvasWidth, this.canvasHeight, 0x41494F);
        this.add.text(this.canvasWidth/2 - 110, 50, "Pausa", { fontSize: "100px", fontFamily: "gatText" })
        const botoContinuar = this.add.text();
        this.input.keyboard.on('keydown-ESC', () => {
            this.game.scene.resume('PlatformScene');
            this.scene.stop();
        }, this);

    }
    update(){
        
    }
}