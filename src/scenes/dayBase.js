import HUD from '../auxs/HUD.js';

export default class DayBase extends Phaser.Scene {
	constructor(dayNumber) {
		super({key: 'day' + dayNumber });
	}

	create() {
		// temporizador, se pone en minutos
    	this.timer = 2;
    	// tiempo transcurrido desde el comienzo del día
    	this.elapsed_Time = 0;

    	let objectHUD = new HUD(this);
    	this.fails = objectHUD.getFailsObject();
	}

	update(t, dt){
    this.elapsed_Time += dt;
    // se multiplica por 60 para pasar a segundos y por 1000, para pasar a milisegundos
    // al terminar el día la última estatua obviamente no se comprueba
    if (this.elapsed_Time > this.timer * 60 * 1000) {
      // se para la escena actual
      this.scene.pause(this.scene.key);
      // se lanza encima la pantalla final
      // se pasa a la pantalla final la puntuación
      // los datos que se pasen de una escena a otra hay que pasarlos como los parámetros de un objeto, aunque solo sea uno
      // la puntuación es el número de estatuas que se han revisado menos el número de fallos
      this.scene.launch('end', {score: this.statueManager.getSuccess(), sceneKey: this.scene.key});
    }
  }
  
  getStatue() {
    return this.statueManager.statueInst;
  }
}