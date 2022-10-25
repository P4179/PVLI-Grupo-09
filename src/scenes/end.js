// Escena de la pantalla final
// Se muestra un texto que al pulsarlo te regresa a la pantalla de título

export default class End extends Phaser.Scene {
	// Constructor de la escena
	constructor() {
		super({ key: 'end' });
	}
	
	// Creación de la escena
	create() {
		// se añade el texto a la escena actual
		var end = this.add.text(this.sys.game.canvas.width/2, 
			this.sys.game.canvas.height/2, 
			"End!", 
			{fontFamily: 'ink_free'});
		end.setOrigin(0.5, 0.5);
		end.setStyle({
			fontSize: '100px',
			color: 'red'
		});

		// se hace que el texto sea interactivo, de modo que al pulsarlo se produzca un evento
		// si no se añaden argumentos a la función el área de toque es el de la textura
		end.setInteractive();
		// se produce este evento justo cuando se toca la imagen
		end.on('pointerdown', () => {
			this.scene.stop('level1');
			this.scene.start('title');
		});
	}
}