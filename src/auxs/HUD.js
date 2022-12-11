import Clock from '../objects/clock.js';
import Fails from '../objects/fails.js';
import Buttons_Yes_No from '../objects/button_yes_no.js';
import Space_Boundary from '../objects/space_boundary.js';
import Comparator from '../objects/comparator.js';


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

		// se instancia el comparador
		this.add(new Comparator(this.scene, 100, 250));

		// instancia de bounadries
		this.boundaries = this.scene.physics.add.staticGroup();
		this.upper_boundary = new Phaser.GameObjects.Rectangle(this.scene, this.scene.sys.canvas.width / 2, this.scene.sys.canvas.height/2 - 170, 550);
		// this.left_boundary = new Phaser.GameObjects.Rectangle(this.scene,  this.scene.sys.canvas.width / 2, this.scene.sys.canvas.height/2 + 65, 500);
		// this.right_boundary = new Phaser.GameObjects.Rectangle(this.scene, 50, -25, 500);
		this.scene.add.existing(this.upper_boundary);
		// this.scene.add.existing(this.left_boundary);
		// this.scene.add.existing(this.right_boundary);
		this.boundaries.add(this.upper_boundary);
		// this.boundaries.add(this.left_boundary);
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