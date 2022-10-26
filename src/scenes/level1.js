import Clock from '../objects/clock.js';
import Score from '../objects/score.js';
import Authenticity_Certificate from '../objects/Authenticity_Certificate.js';
import Estatua from '../objects/Statue.js';

// Escena que se trata del nivel 1 del juego

export default class Level1 extends Phaser.Scene {
  // Constructor de la escena
  constructor() {
    super({ key: 'level1' });
    this.elapsed_Time = 0;
    // tiempo que tiene que pasar para que se cambie de escena
    this.timer = 0.1;

    // datos de las estatuas y los certificados
    let statue1 = {
      p1: this,
      p2: 200,
      p3: 200,
      p4: "man1",
      p5: true,
      p6: 600,
      p7: 300,
      p8: "Balls",
      p9: {d: 22, m: 2, y: -933},
      p10: "01001",
      p11: {d: 11, m: 1, y: 2222},
      p12: 'man1',
      p13: 500,
      p14: "nombredeartista"
    }

    let statue2 = {
      p1: this,
      p2: 200,
      p3: 200,
      p4: "man2",
      p5: true,
      p6: 600,
      p7: 300,
      p8: "Balls",
      p9: {d: 22, m: 2, y: -933},
      p10: "01001",
      p11: {d: 11, m: 1, y: 2222},
      p12: 'man2_Fake',
      p13: 500,
      p14: "hola"
    }

    // array con los datos de las estatuas y los certificados
    this.statues = [statue1, statue2];

    // estatua actual
    this.statueAct = 0;
  }

  // Creación de los elementos que componen el nivel 1
  create() {
    // se crea la primera estatua
    this.newStatue();

    // se instancia el reloj
    // se pasa la fecha como un solo objeto con tres parámetros
    new Clock(this, 100, 400, {d: 2, m: 3, y: 5});

    // instancia de Score
    this.score = new Score(this, 100, 100);
    // escritura de la puntuación por pantalla
    this.score.writeScore();

    // se registra el input de la tecla P
    this.p = this.input.keyboard.addKey('P');
    // se registra un callback, es decir, se llama a este método después de que se produzca un evento, pulsar la tecla P
    this.p.on('down', () => {
      this.nextStatue();
    });
  }

  newStatue(){ 
    // si se está en la última estatua no se instancia una nueva
    if(this.statueAct === this.statues.length){
      ++this.statueAct;
    }
    // se instancia una nueva estatua
    else {
      this.statueInst = new Estatua(this.statues[this.statueAct].p1, this.statues[this.statueAct].p2, this.statues[this.statueAct].p3, this.statues[this.statueAct].p4, this.statues[this.statueAct].p5,
      this.statues[this.statueAct].p6, this.statues[this.statueAct].p7, this.statues[this.statueAct].p8, this.statues[this.statueAct].p9, this.statues[this.statueAct].p10, this.statues[this.statueAct].p11,
      this.statues[this.statueAct].p12, this.statues[this.statueAct].p13, this.statues[this.statueAct].p14);
      ++this.statueAct;
    }
  }

  // se destruye la estatua anterior y se pasa a la siguiente
  nextStatue(){ 
    this.statueInst.destroy();  // tendría que ser un método de la estatua
    this.newStatue();
  }

  update(t, dt){
    this.elapsed_Time += dt;

    // si ha pasado el suficiente tiempo para que termine la jornada, la estatua actual obviamente no se considera que se haya comprobado
    if(this.elapsed_Time > this.timer * 60 * 1000 || this.statueAct > this.statues.length){
      this.elapsed_Time = 0;
      // se para la escena actual
      this.scene.pause(this.scene.key);
      // se lanza encima la pantalla final
      // se pasa a la pantalla final la puntuación
      // los datos que se pasen de una escena a otra hay que pasarlos como los parámetros de un objeto, aunque solo sea uno
      // la puntuación es el número de estatuas que se han revisado menos el número de fallos
      this.scene.launch('end', {score: this.statueAct - this.score.getScore() - 1});
    }
  }

}