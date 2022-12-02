import Button from '../objects/button.js'

export default class XRAY extends Button {
    /**
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     */
    constructor(scene, x, y){
        super(scene, x, y, 'button_xray', "XRAY");

        // suscripción al evento, de modo que cuando se emita sucederá lo que hay en el arrow function
        this.on(this.sprite, () => {
            // animacin contenido estatua
        });

        this.setScale(0.8);
    }
}