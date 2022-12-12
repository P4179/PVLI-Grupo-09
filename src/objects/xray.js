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
            this.aspecto.play('click' + this.sprite);
            this.moveText.play();
            // animación contenido estatua
            this.xray(this.scene.getStatue());
        });
    }

    xray(statue) {
        statue.showContent();
    }
}