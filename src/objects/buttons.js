//import Boot from "../scenes/boot.js";

export default class Buttons_Yes_No extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y){
        super(scene, x, y);
        this.scene.add.existing(this);
        var pointerdown=this.pointerdown;

        var buttonYes = this.add.image(0, 0, 'yes_button');
        var ButtonNo = this.add.image(0, 0, 'no_button');

        buttonYes.setDisplaySize(300,147);
        buttonNo.setDisplaySize(300,147);

        this.add(buttonYes);
        this.add(buttonNo);

        this.setScale(3,3);
        
        this.sprite.anims.create({
			key: 'clickYes',
			frames: scene.anims.generateFrameNumbers( 'yes_button', {start:0, end:1}),
			frameRate: 5,
			repeat: 1
		});

        this.sprite.anims.create({
			key: 'clickNo',
			frames: scene.anims.generateFrameNumbers('no_button', {start:0, end:1}),
			frameRate: 5,
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