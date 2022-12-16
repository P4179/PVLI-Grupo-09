import Continue from '../objects/continue.js';
import Member from '../objects/member.js';

// Escena de la pantalla final

export default class Family extends Phaser.Scene {
	// Constructor de la escena
	constructor() {
		super({ key: 'family' });
	}

	// se reciben los datos que se han pasado de la escena anterior y se guardan en un atributo de la clase
	init(data){
		this.actDay = data.dayNumber;
	}
	
	// Creación de la escena
	create() {
		const CANVAS_WIDTH = this.game.config.width;
		const CANVAS_HEIGHT = this.game.config.height;
		const WHITE = '0xFFFFFF';

		this.money = parseInt(localStorage.getItem('score')) * 10;

		// se añade el texto a la escena actual
		this.add.bitmapText(CANVAS_WIDTH/2, 80, "documentFont", "FAMILY",)
			.setTintFill(WHITE).setOrigin(0.5, 0.5);
		this.add.image(CANVAS_WIDTH/2, 120, 'white_line');

		this.add.bitmapText(200, CANVAS_HEIGHT / 2 - 130, "documentFont", "Basic care: 100 yuanes")
			.setTintFill(WHITE).setOrigin(0.5, 0.5).setFontSize(25);

		this.add.bitmapText(CANVAS_WIDTH - 200, CANVAS_HEIGHT / 2 - 130, "documentFont", 
			"Money: " + this.money + " yuanes")
			.setTintFill(WHITE).setOrigin(0.5, 0.5).setFontSize(25);

		this.add.image(CANVAS_WIDTH/2, CANVAS_HEIGHT - 150, 'white_line').setScale(2.3, 1);

		this.finalMoney = this.add.bitmapText(CANVAS_WIDTH - 200, CANVAS_HEIGHT - 110, "documentFont", 
			"Final money: " + this.money + " yuanes")
			.setTintFill(WHITE).setOrigin(0.5, 0.5).setFontSize(25);

		this.family = [];
		this.family.push(new Member(this, 200, 220, "Mom"));
		this.family.push(new Member(this, 200, 280, "Son"));
		this.family.push(new Member(this, 200, 340, "Daughter"));
		this.family.push(new Member(this, 200, 400, "Dog"));

		new Continue(this, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 50);
	}

	loadBoxLevel() {
		for(var i = 0; i< this.family.length; ++i) {
			this.family[i].death();
		}

		localStorage.setItem('score', this.money / 10);

		let scene = 'boxLevel' + this.actDay;
		if(this.actDay >= 3) {
			scene = 'title';
		}
		this.scene.start(scene);
	}

	checkMoney() {
		return this.money < 100;
	}

	substractMoney() {
		this.money = this.money - 100;
		this.finalMoney.setText("Final money: " + this.money + " yuanes");
	}

	recoverMoney() {
		this.money = this.money + 100;
		this.finalMoney.setText("Final money: " + this.money + " yuanes");
	}
}