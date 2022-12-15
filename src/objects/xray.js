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

        // suscripción al evento, de modo que cuando se emita sucederá lo que hay en el arrow function
        this.on('button_xray', () => {

            // desactiva el ratón para que no se hagan acciones durante los rayos x
            this.scene.input.mouse.manager.enabled = false;

            this.aspecto.play('click' + this.sprite);
            this.moveText.play();
            // animación contenido estatua
            let eXRAY = this.scene.add.image(this.scene.getStatue().x, this.scene.getStatue().y - 300, 'escaner');
            eXRAY.setScale(2);

            // Animación de bajada y subida del escaner
            let tween = this.scene.tweens.add({
                targets: [ eXRAY ],
                x: this.scene.game.config.width / 2,
                y: 130,
                duration: 390,
                ease: 'Power1',
                paused: true,
                flipX: false,
                yoyo: true,
                repeat: 0,
                delay: 1
            });
            tween.play();

            this.aspecto.on('animationcomplete', ()=>this.xray(this.scene.getStatue()));
            // activa el ratón para poder continuar jugando
            this.scene.input.mouse.manager.enabled = true;         
        });

        this.setScale(0.5);
    }

    xray(statue) {
        statue.showContent();
    }
}