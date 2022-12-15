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
        text = 'COMPARE';
        sprite = 'button_comp';
        state = false;

        super(scene, x, y, sprite, text);

        this.scene.add.existing(this);

        this.textButton.setFontSize(20);

        // suscripción al evento, de modo que cuando se emita sucederá lo que hay en el arrow function
        this.on(sprite, () => {
            if (!state) {
                this.aspecto.play('press' + sprite);
                this.textDown.play();
                state = true;
            }
            else {
                this.aspecto.play('unpress' + sprite);
                this.textUp.play();
                state = false;
            }
            this.scene.getStatue().comparator(state);
            this.scene.darkenScreen(state);
        });

        this.setScale(0.5);
    }
}