// clase Score: se ocupa de la puntuación del jugador 
export default class Score extends Phaser.GameObjects.Text { 
	// constructor de la clase Score
	constructor(scene, x, y){ 
		super(scene, x, y, "", {fontFamily:'Arial'});
		this.scene.add.existing(this);
		this.score = 0; // puntuación inicial del jugador
		this.actScore();
	}

	// devuelve la puntuación del jugador
	getScore(){ 
		return this.score;
	}

	// actualiza la puntuación del jugador
	updateScore(){ 
		++this.score;
		this.actScore();
	}

	actScore(){
		this.setText("Fallos: " + this.score);
	}

	// to-do:
	// - hacer que se muestre por pantalla
	// - probar a instanciar la clase en LVL1 para ver si se escribe por pantalla
}