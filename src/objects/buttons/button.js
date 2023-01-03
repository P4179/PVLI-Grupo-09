// Botón con imagen y texto personalizable

export default class Button extends Phaser.GameObjects.Container {
    /**
     * Constructor de Estatua, estatua de terracota
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     */
    constructor(scene, x, y, sprite, text){
        super(scene, x, y);

        this.scene.add.existing(this);

        // se asigna el sprite dependiendo del botón
        this.aspecto = this.scene.add.sprite(0, 0, sprite);
        // pulsar el botón, que vuelve a su estado original
        this.aspecto.scene.anims.create({
            key: 'click' + text,
            frames: this.aspecto.anims.generateFrameNames(sprite, {start:0, end:1}),
            // una vez realizada la animación vuelve a su estado original
            yoyo: true,
            // velocidad de los fotogramas
            frameRate: 8,
            repeat: 0   // no se repite la animación
        })
        // pulsar el botón y se queda pulsado
        this.aspecto.scene.anims.create({
            key: 'press' + text,
            frames: this.aspecto.anims.generateFrameNames(sprite, {start:0, end:1}),
            // velocidad de los fotogramas
            frameRate: 5,
            repeat: 0   // no se repite la animación
        })
        // despulsar el botón
        this.aspecto.scene.anims.create({
            key: 'unpress' + text,
            frames: this.aspecto.anims.generateFrameNames(sprite, {start:1, end:0}),
            // velocidad de los fotogramas
            frameRate: 5,
            repeat: 0   // no se repite la animación
        })
        this.add(this.aspecto);

        this.aspecto.setInteractive();

        this.aspecto.on('pointerdown', () => {
            // cuando se pulsa el botón se emite el evento propio
            this.emit(text);
        });

        // se asigna el texto dependiendo del botón
        this.textButton = this.scene.add.bitmapText(0, 0, 'generalFont', text, 30)
        .setOrigin(0.5, 0.5).setTintFill(0xFFFFFF).setDropShadow(5);
        // tween para que el texto se mueva un poco para abajo cuando se pulsa el botón
        this.moveText = this.scene.tweens.add({
            targets: this.textButton,
            y: 7,
            duration: 70,
            ease: 'Sine.easeOut',
            yoyo: true,
            repeat: 0,
            paused: true
        });
        this.textDown = this.scene.tweens.add({
            targets: this.textButton,
            y: 4,
            duration: 0,
            ease: 'Quart.easeOut',
            repeat: 0,
            paused: true,
            delay: 90
        })
        this.textUp = this.scene.tweens.add({
            targets: this.textButton,
            y: -4,
            duration: 0,
            ease: 'Quad.easeIn',
            repeat: 0,
            paused: true,
            delay: 90
        })
        this.add(this.textButton);

        this.setScale(0.8);
    }
}