import Bg_Button from '../objects/bg_button.js'

export default class Button_Yes_No extends Phaser.GameObjects.Container {
	/**
	 * Constructor del documento
	 * @param {Scene} scene - the GO's scene
	 * @param {number} x - coordinate x
	 * @param {number} y - coordinate y
	 */
	constructor(scene, x, y, type) {
		super(scene, x, y);
		this.scene.add.existing(this); 

		// se crean los hijos y se añaden al propio container, es decir, al this
		let aspecto = new Bg_Button(scene, 0, 0, type);
		this.add(aspecto);

		let text;
		if(type){
			text = "Yes"
		}
		else{
			text = "No"
		}
		let textButton = this.scene.add.text(0, 0, text, {fontFamily: 'Ink Free'}).setOrigin(0.5, 0.5);
		textButton.setFontSize('50px');
		this.add(textButton);

		this.setScale(0.8);
	}
}