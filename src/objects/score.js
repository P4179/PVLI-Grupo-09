// clase Score: se ocupa de la puntuación del jugador 
export default class Score extends Phaser.GameObjects.Text { 
	// constructor de la clase Score
	constructor(scene, x, y){ 
		super(scene, x, y);
		this.scene.add.existing(this);
		this.name = "Score"; // asignación de nombre
		this.score = 0; // puntuación inicial del jugador
	}

	// devuelve la puntuación del jugador
	getScore(){ 
		return this.score
	}

	// actualiza la puntuación del jugador
	setScore(newScore){ 
		this.score = newScore
	}

	// muestra la puntuación por pantalla
	writeScore(){
		let escritura = this.getScore();
		this.scene.add.text(100, 100, 'Score: ' + escritura, {fontFamily: 'Arial'});
	}

	// to-do:
	// - hacer que se muestre por pantalla
	// - probar a instanciar la clase en LVL1 para ver si se escribe por pantalla
}