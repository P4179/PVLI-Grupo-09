import Button from './button.js'

export default class Button_Yes_No extends Button {
	/**
	 * Constructor del butón de sí y no, extiende de la clase botón
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 * @param {bool} type - si es el botón de SÍ o el botón de NO
	 */
	constructor(scene, x, y, type) {
		let sprite, text;
		if(type){
			sprite = 'button_yes';
			text = 'YES';
		}
		else{
			sprite = 'button_no';
			text = 'NO';
		}
		super(scene, x, y, sprite, text);

		this.scene.add.existing(this);

		// suscripción al evento, de modo que cuando se emita sucederá lo que hay en el arrow function
		this.on(text, () => {
			this.aspecto.play('click' + text);
            this.moveText.play();
			this.scene.statueManager.nextStatue(type);
			// cuando se pulsa el botón de SÍ o NO hasta que no llega la sig estatua no se puede volver a pulsar
			this.scene.input.mouse.manager.enabled = false;
		});
	}
}