//import Boot from "../scenes/boot.js";

export class Buttons_Yes_No extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y){
        super(scene, x, y);
        this.objects.add.existing(this);
        
        this.anims.create({
            key: 'clickYes', 
            frames: this.anims.generateFrameNames('yes_button', {prefix:'prefijo_en_json'}),
            repeat: -1 
        });

        this.anims.create({
            key: 'clickNo', 
            frames: this.anims.generateFrameNames('no_button', {prefix:'prefijo_en_json'}),
            repeat: -1 
        });

        buttonYes = this.add.sprite(this.sys.game.canvas.width/3, this.sys.game.canvas.heigth/3, 'yes_button');

        ButtonNo = this.add.sprite(this.sys.game.canvas.width/3, this.sys.game.canvas.heigth/4, 'no_button');


        //buttonYes.setDisplaySize(300,147);
        //buttonNo.setDisplaySize(300,147);

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