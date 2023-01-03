import HUD from '../../auxs/HUD.js';
import Manual from '../../objects/manual.js';

// Escena base de las escenas donde se comprueba si pueden pasar o no las estatuas

export default class DayBase extends Phaser.Scene {
	constructor(dayNumber, date) {
		super({key: 'day' + dayNumber });
    this.dayNumber = dayNumber;
    this.date = date;
	}

	create() {
    this.CANVAS_WIDTH = this.game.config.width;
    this.CANVAS_HEIGHT = this.game.config.height;
    
    // temporizador
    this.timer = this.minutesToMs(4);
    // tiempo transcurrido desde el comienzo del día

    // HUD
    this.HUD = new HUD(this, this.date);
    // se cogen los fallos del HUD y se guardan en un atributo de la clase
    this.fails = this.HUD.getFailsObject();

    // se crea el manual
    new Manual(this, 650, this.CANVAS_WIDTH / 4, this.dayNumber);

    this.ambientalMusic();
    this.music.play();  // se enciende la música al comenzar un día

    this.initDay();
    this.dayStarted();

    // hacer que la pantalla se vuelva oscura cuando se activa el comparador
    this.grayscreen = this.add.rectangle(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT, 0x000000, 0.5)
      .setOrigin(0).setVisible(false);

    // si se comete el número máximo de fallos, se pierde
    this.events.on('maxFails', () => {
      // se paran todos los sonidos
      this.game.sound.stopAll();
      this.scene.start('gameover', {info: 'maxFails'});
    })
	}

	update(t, dt){
    this.elapsed_Time += dt;
    if (this.elapsed_Time > this.timer) {
      this.dayEnded();
      this.elapsed_Time = 0;
    }
  }

  // Gestión del texto que indica el nuevo día y que ha terminado
  initDay() {
    this.dayText = this.add.bitmapText(this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2,
      'generalFont', "DAY " + this.dayNumber, 5)
      .setOrigin(0.5, 0.5).setTintFill(0xffffff).setDropShadow(1).setVisible(false);

    // animación de entrada
    this.appear = this.tweens.add({
      targets: this.dayText,
      scale: 8,
      duration: 1000,
      ease: 'Cubic.easeIn',
      repeat: 0,
      paused: true,
    })

    // animación de saldia
    this.disappear = this.tweens.add({
      targets: this.dayText,
      scale: 0,
      duration: 1000,
      ease: 'Circ.easeOut',
      repeat: 0,
      delay: 1000,
      paused: true,
    })
  }
  dayStarted() {
    // se empieza con el input del ratón desactivado y hasta que no llega la primera estatua no se activa
    this.input.mouse.manager.enabled = false;

    // se comienza a pasar página al calendario
    this.HUD.calendar.on('calendarStarted', () => {
      this.dayText.setVisible(true);
      this.appear.play();
    });

    // se termina de pasar página al calendario
    this.HUD.calendar.on('calendarFinished', () => {
      this.disappear.play();
    })

    // cuando comienza a desaparecer el texto que indica el día actual,
    // comienza el nuevo día 
    this.disappear.on('start', () => {
      // comienza el contador
      this.elapsed_Time = 0;
      // cuando recogemos o emitimos un evento propio en una escena hay que acceder a events
      this.events.emit('startDay');
    })

    this.disappear.on('complete', () => {
      this.dayText.setVisible(false);
    });
  }

  dayEnded() {
    // cuando termina el día se desactiva el input de ratón
    this.input.mouse.manager.enabled = false;

    this.score();

    this.dayText.setText("DAY ENDED");
    this.dayText.setFontSize(5);
    this.dayText.setVisible(true);
    this.appear.play();

    this.appear.on('complete', () => {
      this.disappear.play();
      // evento propia que indica que el día ha terminado
      // se utiliza para hacer que el reloj deje de parpadear
      this.events.emit('endDay');
    });

    // los datos que se pasen de una escena a otra hay que pasarlos como los parámetros de un objeto
    this.disappear.on('complete', () => {
      this.input.mouse.manager.enabled = true;
      // se desactiva la música
      this.music.stop();
      this.scene.start('family', {dayNumber: this.dayNumber})
    });
  }

  // se crea la música ambiental del juego
  ambientalMusic() {
    const config = {
      mute: false,
      volume: 0.05,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    }; 
    this.music = this.sound.add("demoAudio", config);
  }

  // se calcula la nueva puntuación
  // se suma a la del día anterior
  score() {
    let lastScore = parseInt(localStorage.getItem('score'));
    let actScore = this.statueManager.getSuccess();
    let newScore = lastScore + actScore;
    // se guarda la puntuación localmente
    localStorage.setItem('score', newScore);
  }

  minutesToMs(minutes) {
    return minutes * 60 * 1000;
  }
  
  getStatue() {
    return this.statueManager.statueInst;
  }
  
  darkenScreen(b) {
    this.grayscreen.setVisible(b);
  }
}