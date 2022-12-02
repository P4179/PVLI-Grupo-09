// Botón con imagen y texto personalizable

export default class Button extends Phaser.GameObjects.Container {
    /**
     * Constructor de Estatua, estatua de terracota
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     * @param {boolean} type - determina si se trata del botón de SÍ o NO
     */
    constructor(scene, x, y, sprite, text){
        super(scene, x, y);

        this.scene.add.existing(this);

        // se asigna el sprite dependiendo del botón
        let aspecto = this.scene.add.sprite(0, 0, sprite);
        aspecto.scene.anims.create({
            key: 'click' + sprite,
            frames: aspecto.anims.generateFrameNames(sprite, {start:1, end:0}),
            // velocidad de los fotogramas
            frameRate: 5,
            repeat: 0   // no se repite la animación
        })
        this.add(aspecto);

        // se asigna el texto dependiendo del botón
        let textButton = this.scene.add.text(0, 0, text, {fontFamily: 'Ink Free'}).setOrigin(0.5, 0.5).setFontSize('50px');
        this.add(textButton);

        aspecto.setInteractive();

        aspecto.on('pointerdown', () => {
            aspecto.play('click' + sprite);
            // cuando se pulsa el botón se emite el evento propio
            this.emit(sprite);
        });

        this.setScale(0.8);
    }
}