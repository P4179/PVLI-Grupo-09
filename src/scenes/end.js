// Escena de la pantalla final
// Se muestra un texto que al pulsarlo te regresa a la pantalla de título

export default class End extends Phaser.Scene {
	// Constructor de la escena
	constructor() {
		super({ key: 'end' });
	}

	// se reciben los datos que se han pasado de la escena anterior y se guardan en un atributo de la clase
	init(data){
		this.score = data.score;
		this.actLv = data.sceneKey;
	}
	
	// Creación de la escena
	create() {
		// se añade el texto a la escena actual
		var end = this.add.text(this.game.config.width/2, this.game.config.height/2, "End!", {fontFamily: 'Ink Free'})
		.setOrigin(0.5, 0.5).setStyle({fontSize: '100px', color: 'red'});

		// se hace que el texto sea interactivo, de modo que al pulsarlo se produzca un evento
		// si no se añaden argumentos a la función el área de toque es el de la textura
		end.setInteractive();
		// se produce este evento justo cuando se toca la imagen
		end.on('pointerdown', () => {
			this.scene.stop(this.actLv);
			this.scene.start('title');
		});

		// texto con la puntuación
		var score = this.add.text(this.game.config.width/2, this.game.config.height/2 + 80, "Score: " + this.score, 
			{fontFamily: 'Arial'}).setOrigin(0.5, 0.5).setFontSize('25px');
	}
}