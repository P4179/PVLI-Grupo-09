import Calendar from '../objects/calendar.js';
import Fails from '../objects/fails.js';
import Buttons_Yes_No from '../objects/button_yes_no.js';
import Space_Boundary from '../objects/space_boundary.js';
import Comparator from '../objects/comparator.js';
import Background from '../objects/background.js';
import Clock from '../objects/clock.js';

// HUD

export default class HUD extends Phaser.GameObjects.Container {
	// Constructor de la escena
	// Argumento fecha para el reloj
	constructor(scene, date){
		super(scene, 0, 0);

		this.scene.add.existing(this);

		const CANVAS_WIDTH = this.scene.game.config.width;
		const CANVAS_HEIGHT = this.scene.game.config.height;

		this.add(new Background(this.scene));

		this.add(new Buttons_Yes_No(this.scene, 90, CANVAS_HEIGHT - 220, true));
		this.add(new Buttons_Yes_No(this.scene, 90, CANVAS_HEIGHT - 70, false));

		// calendario
		// se pasa la fecha como un solo objeto con tres parámetros
		this.calendar = new Calendar(this.scene, CANVAS_WIDTH - 90, CANVAS_HEIGHT - 230, date);
		this.add(this.calendar);

		// reloj
		this.add(new Clock(this.scene, CANVAS_WIDTH - 90, CANVAS_HEIGHT - 45));

		// instancia de Fails
		this.fails = new Fails(this.scene, CANVAS_WIDTH - 10, 10);

		// se instancia el comparador
		this.add(new Comparator(this.scene, CANVAS_WIDTH - 140, CANVAS_HEIGHT - 125));

		// instancia de bounadries
		// this.boundaries = this.scene.physics.add.staticGroup();
		// límite superior
		// this.upper_boundary = new Phaser.GameObjects.Rectangle(this.scene, this.scene.sys.canvas.width / 2, this.scene.sys.canvas.height/2 - 170, 550);
		// this.scene.add.existing(this.upper_boundary);
		// this.boundaries.add(this.upper_boundary);
		// this.left_boundary = new Phaser.GameObjects.Rectangle(this.scene,  this.scene.sys.canvas.width / 2, this.scene.sys.canvas.height/2 + 65, 500);
		// this.scene.add.existing(this.left_boundary);
		// this.boundaries.add(this.left_boundary);
		// this.right_boundary = new Phaser.GameObjects.Rectangle(this.scene, 50, -25, 500);
		// this.scene.add.existing(this.right_boundary);
		// this.boundaries.add(this.right_boundary);
	}

	activateComparator(){
		let documents = this.scene.getStatue().getDocuments();
		documents.children.each(function(doc) {
			doc.destroyMe();
		  }, this);
	}

	getFailsObject(){
		return this.fails;
	}

	getBoundaries(){
		return this.boundaries;
	}
}