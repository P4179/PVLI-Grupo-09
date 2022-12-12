// clase Fails: se ocupa de los fallos que comete el jugador en un nivel

export default class Fails extends Phaser.GameObjects.BitmapText { 
	// constructor de la clase Fails
	constructor(scene, x, y){ 
		super(scene, x, y, 'documentFont');
		this.scene.add.existing(this);

		this.setOrigin(1, 0).setFontSize(25).setTintFill(0xFFFFFF);

		this.fails = 0; // fallos iniciales del jugador
		this.actFails();
	}

	// devuelve los fallos del jugador
	getFails(){ 
		return this.fails;
	}

	// se añade un fallo al jugador
	addFail(){ 
		++this.fails;
		this.actFails();
	}

	// actualzia el texto con los fallos del jugador
	actFails(){
		this.setText("Fails: " + this.fails);
	}
}