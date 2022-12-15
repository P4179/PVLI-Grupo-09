import Calendar from '../objects/calendar.js';
import Fails from '../objects/fails.js';
import Buttons_Yes_No from '../objects/button_yes_no.js';
import Comparator from '../objects/comparator.js';
import Background from '../objects/background.js';
import Clock from '../objects/clock.js';
import Manual from '../objects/manual.js';

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

		// se instancia el comparador
		this.add(new Comparator(this.scene, CANVAS_WIDTH - 140, CANVAS_HEIGHT - 125));

		// calendario
		// se pasa la fecha como un solo objeto con tres parámetros
		this.calendar = new Calendar(this.scene, CANVAS_WIDTH - 90, CANVAS_HEIGHT - 230, date);
		this.add(this.calendar);

		// reloj
		this.add(new Clock(this.scene, CANVAS_WIDTH - 90, CANVAS_HEIGHT - 45, 8));

		// instancia de Fails
		this.fails = new Fails(this.scene, CANVAS_WIDTH - 10, 10);

		// se instancia el comparador
		this.add(new Comparator(this.scene, 100, 250));
		// this.comparator_text = this.scene.add.bitmapText(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 'documentFont', 'hello', 11);
		// this._sNametext.setOrigin(0.5);
		// this._sNametext.setFontSize(this.fontsize);
	}

	activateComparator(){
		let documents = this.scene.getStatue().getDocuments();
		documents.children.each(function(doc) {
			doc.destroyMe();
		  }, this);
	}

	showComparatorText(text){
		this.comparator_text.text = text;
	}

	getFailsObject(){
		return this.fails;
	}

	getBoundaries(){
		return this.boundaries;
	}
}