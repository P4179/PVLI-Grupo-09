import HUD from '../auxs/HUD.js';

export default class DayBase extends Phaser.Scene {
	constructor(dayNumber, date) {
		super({key: 'day' + dayNumber });
    this.dayNumber = dayNumber;
    this.date = date;
	}

	create() {
		// temporizador, se pone en minutos
    	this.timer = 1;
    	// tiempo transcurrido desde el comienzo del día
    	this.elapsed_Time = 0;

    	let objectHUD = new HUD(this, this.date);
    	this.fails = objectHUD.getFailsObject();

      this.grayscreen = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000, 0.5);
      this.grayscreen.setOrigin(0);
      this.grayscreen.setVisible(false);

      // Música del juego (ambiental)
      const config = {
        mute: false,
        volume: 0.01,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0,
      }; 

      this.music = this.sound.add("demoAudio", config);
      this.music.play();

	}

	update(t, dt){
    this.elapsed_Time += dt;
    // se multiplica por 60 para pasar a segundos y por 1000, para pasar a milisegundos
    // al terminar el día la última estatua obviamente no se comprueba
    if (this.elapsed_Time > this.timer * 60 * 1000) {
      this.score();
      // se pasa a la pantalla final el número del día actual
      // los datos que se pasen de una escena a otra hay que pasarlos como los parámetros de un objeto, aunque solo sea uno
      // la puntuación es el número de estatuas que se han revisado menos el número de fallos
      this.scene.start('end', {dayNumber: this.dayNumber});
    }
  }

  score() {
    let lastScore = parseInt(localStorage.getItem('score'));
    let actScore = this.statueManager.getSuccess();
    let newScore = lastScore + actScore;
    localStorage.setItem('score', newScore);
  }
  
  getStatue() {
    return this.statueManager.statueInst;
  }

  darkenScreen(b) {
    this.grayscreen.setVisible(b);
  }
}