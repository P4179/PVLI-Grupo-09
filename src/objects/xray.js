

export default class XRAY extends Phaser.GameObjects.Sprite {
    /**
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     */
    constructor(scene, x, y){
        super(scene, x, y, 'button_xray');
        this.scene.add.existing(this);

        this.scene.anims.create({
            key: 'click', 
            frames: this.anims.generateFrameNames('button_xray', {start:1, end:0}),
            // velocidad de los fotogramas
            frameRate: 5,
            repeat: 0  // no se repite la animación
        });

        this.setInteractive();

        this.on('pointerdown', () => {
            this.play('click');
            // animacin contenido estatua
            
        });
        let textButton = this.scene.add.text(x, y, 'XRAY', {fontFamily: 'Ink Free'}).setOrigin(0.5, 0.5);
        textButton.setFontSize('50px');
        this.scene.add.existing(textButton);
        textButton.setScale(0.7);

        this.setScale(0.8);
    }
}