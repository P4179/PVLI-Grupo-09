import Clock from '../objects/clock.js';
import Fails from '../objects/fails.js';
import Buttons_Yes_No from '../objects/button_yes_no.js';

// HUD

export default class HUD extends Phaser.GameObjects.Container {
	// Constructor de la escena
	// Argumento fecha para el reloj
	constructor(scene){
		super(scene, 0, 0);

		this.scene.add.existing(this);

		const CANVAS_WIDTH = this.scene.sys.canvas.width;
		const CANVAS_HEIGHT = this.scene.sys.canvas.height;

		// fondo
		// todos los sprites se añaden después del fondo porque sino quedan debajo
		this.add(this.scene.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(CANVAS_WIDTH, CANVAS_HEIGHT));

		this.add(new Buttons_Yes_No(this.scene, CANVAS_WIDTH - 100, 380, true));
		this.add(new Buttons_Yes_No(this.scene, CANVAS_WIDTH - 100, 530, false));

		// se instancia el reloj
		// se pasa la fecha como un solo objeto con tres parámetros
		this.add(new Clock(this.scene, 90, CANVAS_HEIGHT - 70, {d: 15, m: 10, y: 2022}));

		// instancia de Fails
		this.fails = new Fails(this.scene, CANVAS_WIDTH - 10, 10);
	}

	getFailsObject(){
		return this.fails;
	}
}