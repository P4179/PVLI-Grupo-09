// Escena de la pantalla final
// Se muestra un texto que al pulsarlo te regresa a la pantalla de título

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

		// se añade el texto a la escena actual
		var end = this.add.text(CANVAS_WIDTH/2, CANVAS_HEIGHT/2, "Family", {fontFamily: 'Arial'})
		.setOrigin(0.5, 0.5).setStyle({fontSize: 100, color: 'red'});

		// se hace que el texto sea interactivo, de modo que al pulsarlo se produzca un evento
		// si no se añaden argumentos a la función el área de toque es el de la textura
		end.setInteractive();
		// se produce este evento justo cuando se toca la imagen
		end.on('pointerdown', () => {
			this.loadBoxLevel();
		});

		// texto con la puntuación
		// se convierte la puntuación a un entero porque todo lo que está guardado en localStorage es un string
		var score = this.add.text(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 80, "Score: " + parseInt(localStorage.getItem('score')), 
			{fontFamily: 'Arial'}).setOrigin(0.5, 0.5).setFontSize(25);
	}

	loadBoxLevel() {
		let scene = 'boxLevel' + this.actDay;
		if(this.actDay >= 3) {
			scene = 'title';
		}
		this.scene.start(scene);
	}
}