//import Boot from "../scenes/boot.js";

export class Buttons_Yes_No extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y){
        super(scene, x, y);
        this.scene.add.existing(this);
        

        var buttonYes = this.add.sprite(this.sys.game.canvas.width/3, this.sys.game.canvas.heigth/3, 'yes_button');

        var ButtonNo = this.add.sprite(this.sys.game.canvas.width/3, this.sys.game.canvas.heigth/4, 'no_button');


        buttonYes.setDisplaySize(300,147);
        buttonNo.setDisplaySize(300,147);

        this.scene.anims.create({
			key: 'clickYes',
			frames: scene.anims.generateFrameNumbers( 'yes_button', {start:0, end:1}),
			frameRate: 2,
			repeat: 1
		});

        this.scene.anims.create({
			key: 'clickNo',
			frames: scene.anims.generateFrameNumbers('no_button', {start:0, end:1}),
			frameRate: 2,
			repeat: 1
		});

        buttonYes.setInteractive();

        buttonYes.on('pointerdown', pointer => {
        
        //Funciones que hacen pasar la estatua

        });

        buttonNo.setInteractive();

        buttonNo.on('pointerdown', pointer => {
        
        //Funciones que no hacen pasar la estatua

        });
        
    }
    
    


    




}