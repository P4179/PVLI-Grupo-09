import Button from '../objects/button.js'

export default class Button_Yes_No extends Button {
	/**
	 * Constructor del butón de sí y no, extiende de la clase botón
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
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
		this.on(sprite, () => {
			this.aspecto.play('click' + sprite);
            this.moveText.play();
			this.scene.statueManager.nextStatue(type);
		});
	}
}