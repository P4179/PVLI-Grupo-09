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

		this.comparator_text = this.scene.add.bitmapText(0 + 15, 0 + 15, 'documentFont', 'hello', 31);
		this.comparator_text.setDepth(99);
		this.comparator_text.setTintFill(0xFFFFFF);
		this.comparator_text.setOrigin(0);
		this.comparator_text.setVisible(false);

		this.tween = this.scene.tweens.add({
            targets: this.comparator_text,
            scale: 1.5,
            duration: 250,
            ease: 'Sine.easeOut',
            yoyo: true,
            repeat: 4,
            paused: true
        });

		this.tween.on('complete', () => {
        	this.scene.getStatue().resetVars();
			this.comparator_text.setVisible(false);
        })
	}

	activateComparator(){
		let documents = this.scene.getStatue().getDocuments();
		documents.children.each(function(doc) {
			doc.destroyMe();
		  }, this);
	}

	showComparatorText(text){
		if(text === 'Correct')
			this.comparator_text.setTintFill(0x21E521);
		if(text === 'Inorrect')
			this.comparator_text.setTintFill(0xE52121);
		this.tween.play();
		this.comparator_text.text = text;
		this.comparator_text.setVisible(true);
	}

	getFailsObject(){
		return this.fails;
	}

	getBoundaries(){
		return this.boundaries;
	}
}