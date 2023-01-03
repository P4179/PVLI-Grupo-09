import Continue from '../objects/family/continue.js';
import Member from '../objects/family/member.js';

// Escena de la pantalla final

export default class Family extends Phaser.Scene {
	// Constructor de la escena
	constructor() {
		super({ key: 'family' });
	}

	// se reciben los datos que se han pasado de la escena anterior y se guardan en un atributo de la clase
	init(data){
		this.actDay = 3;
	}
	
	// Creación de la escena
	create() {
		const CANVAS_WIDTH = this.game.config.width;
		const CANVAS_HEIGHT = this.game.config.height;
		const WHITE = '0xFFFFFF';

		// precio de los cuidados básicos
		this.basicCares = 100;

		// el dinero es la puntuación multiplicado por 10
		this.money = parseInt(localStorage.getItem('score')) * 10;

		// se añade el texto a la escena actual
		this.add.bitmapText(CANVAS_WIDTH/2, 80, "generalFont", "FAMILY",)
			.setTintFill(WHITE).setOrigin(0.5, 0.5);
		this.add.image(CANVAS_WIDTH/2, 120, 'white_line');

		this.add.bitmapText(200, CANVAS_HEIGHT / 2 - 130, "generalFont", "Basic care: " + this.basicCares + " yuanes")
			.setTintFill(WHITE).setOrigin(0.5, 0.5).setFontSize(25);

		this.add.bitmapText(CANVAS_WIDTH - 200, CANVAS_HEIGHT / 2 - 130, "generalFont", 
			"Money: " + this.money + " yuanes")
			.setTintFill(WHITE).setOrigin(0.5, 0.5).setFontSize(25);

		this.add.image(CANVAS_WIDTH/2, CANVAS_HEIGHT - 150, 'white_line').setScale(2.3, 1);

		this.finalMoney = this.add.bitmapText(CANVAS_WIDTH - 200, CANVAS_HEIGHT - 110, "generalFont", 
			"Final money: " + this.money + " yuanes")
			.setTintFill(WHITE).setOrigin(0.5, 0.5).setFontSize(25);

		// miembros de la familia
		this.family = [];
		this.family.push(new Member(this, 200, 220, "Wife", this.basicCares));
		this.family.push(new Member(this, 200, 280, "Son", this.basicCares));
		this.family.push(new Member(this, 200, 340, "Daughter", this.basicCares));
		this.family.push(new Member(this, 200, 400, "Dog", this.basicCares));

		// botón continuar
		let continueButton = new Continue(this, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 50);

		continueButton.on('buttonPressed', () => {
			this.nextScene();
		});
	}

	nextScene() {
		// se mata los miembros de la familia que no se han cuidado
		this.family.forEach((member) => {
			member.death(this.actDay);
		});

		// se guarda la nueva puntuación
		localStorage.setItem('score', this.money / 10);

		let allDeath = true;
		// se comprueba si queda algún integrante vivo en la familia
		var i = 0;
		while(i < this.family.length && allDeath) {
			if (!this.family[i].isDeath) {
				allDeath = false;
			}
			++i;
		}

		let scene;
		let info;

		if(allDeath) {
			scene = 'gameover';
			info = 'familyDeath';
		}

		else {
			scene = 'transition';
			info = this.actDay;

			if(this.actDay >= 3) {
				scene = 'victory';
			}
		}

		this.scene.start(scene, {info: info});
	}

	// comprobar si el dinero es mayor que 100 para cuidar a un miembro de la familia
	checkMoney() {
		return this.money < this.basicCares;
	}

	substractMoney() {
		this.money = this.money - this.basicCares;
		this.finalMoney.setText("Final money: " + this.money + " yuanes");
	}

	recoverMoney() {
		this.money = this.money + this.basicCares;
		this.finalMoney.setText("Final money: " + this.money + " yuanes");
	}
}