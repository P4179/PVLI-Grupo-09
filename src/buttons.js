import Boot from './scenes/boot.js';

export class Buttons_Yes_No extends Phaser.GameObjects.Container {
    
    constructor(scene, x, y){
        super(scene, x, y);
        this.scene.add.existing(this);

        var buttonYes = this.scene.add.sprite(0, 0, '');
        var ButtonNo = this.scene.add.sprite(0, 0, '');

        buttonYes.setDisplaySize(300,147);
        buttonNo.setDisplaySize(300,147);

        this.add(buttonYes);
        this.add(buttonNo);

        this.setScale(3,3);
          
    }
    
    buttonYes.setInteractive();

    buttonYes.on('pointerdown', () => {
        
        //Funciones que hacen pasar la estatua

    });


    buttonNo.setInteractive();

    buttonNo.on('pointerdown', () => {
        
        //Funciones que no hacen pasar la estatua

    });




}