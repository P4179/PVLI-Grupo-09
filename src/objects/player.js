export default class Score extends Phaser.GameObjects.Text { // clase Score: se ocupa de la puntuación del jugador 
	constructor(){ // constructor de la clase Score
		this.name = "Score"; // asignación de nombre
		this.score = 0; // puntuación inicial del jugador
	}

	getScore(){ // devuelve la puntuación del jugador
		return this.score
	}
	setScore(int newScore){ // actualiza la puntuación del jugador
		this.score = newScore
	}
}