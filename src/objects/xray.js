import Button from '../objects/button.js'

export default class XRAY extends Button {
    /**
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     */
    constructor(scene, x, y){
        super(scene, x, y, 'button_xray', "XRAY");

        this.scene.add.existing(this);

        this.sprite = 'button_xray';
        this.setScale(0.5);

        // animación contenido estatua
        // setDepth(10) para que se renderice delante de las estatuas
        this.eXRAY = this.scene.add.sprite(0, 0, 'escaner').setScale(1.8).setVisible(false).setDepth(10);
        // animación de bajada y subida del escaner
        this.tween = this.scene.tweens.add({
            targets: this.eXRAY,
            x: this.scene.game.config.width / 2,
            y: 120,
            duration: 390,
            ease: 'Power1',
            flipX: false,
            yoyo: true,
            paused: true,
            repeat: 0,
            delay: 1
        });

        // se produce este evento cuando se ha pulsado el botón
        this.on('button_xray', () => {
            // se desactiva el ratón para que no se hagan acciones durante los rayos X
            this.scene.input.mouse.manager.enabled = false;

            // animaciones del botón
            this.aspecto.play('click' + this.sprite);
            this.moveText.play();

            this.eXRAY.setVisible(true);
            this.eXRAY.x = this.scene.getStatue().x;
            this.eXRAY.y = this.scene.getStatue().y - 300;

            // animación de eXRAY
            this.tween.play();

            // cuando se ha terminado la animación del botón se muestra el contenido de la estatua
            this.aspecto.on('animationcomplete', () => {
                this.xray(this.scene.getStatue());
            });

            // se activa el ratón para poder continuar jugando
            this.scene.input.mouse.manager.enabled = true;         
        });
    }

    xray(statue) {
        // si se ha mostrado el contenido de la estatua, se desactiva el escaner
        if(statue.showContent()) {
            this.eXRAY.setVisible(false);
        }
    }
}