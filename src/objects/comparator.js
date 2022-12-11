import Button from '../objects/button.js'

export default class Comparator extends Button {
    /**
     * Constructor del butón de sí y no, extiende de la clase botón
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     */
    constructor(scene, x, y) {
        let sprite, text, state;

        text = 'Comparator';
        sprite = 'button_xray';
        state = false;

        super(scene, x, y, sprite, text);

        this.scene.add.existing(this);

        // suscripción al evento, de modo que cuando se emita sucederá lo que hay en el arrow function
        this.on(sprite, () => {
            if (!state)
                state = true;
            else
                state = false;
            this.scene.getStatue().comparator(state);
        });
    }
}