import Clock from '../objects/clock.js';
import Score from '../objects/score.js';
import Authenticity_Certificate from '../objects/Authenticity_Certificate.js'

// Escena que se trata del nivel 1 del juego

export default class Level1 extends Phaser.Scene {
  // Constructor de la escena
  constructor() {
    super({ key: 'level1' });
    this.elapsed_Time = 0;
    // tiempo que tiene que pasar para que se cambie de escena
    this.timer = 0.1;

    // datos de los certificados
    let cer1 = {
      p1: this,
      p2: 600,
      p3: 300,
      p4: "Balls",
      p5: {d: 22, m: 2, y: -933},
      p6: "01001",
      p7: {d: 11, m: 1, y: 2222},
      p8: 'man2_Fake',
      p9: 500,
      p10: "nombredeartista"
    }

    let cer2 = {
      p1: this,
      p2: 600,
      p3: 300,
      p4: "Balls",
      p5: {d: 22, m: 2, y: -933},
      p6: "01001",
      p7: {d: 11, m: 1, y: 2222},
      p8: 'man2_Fake',
      p9: 500,
      p10: "hola"
    }

    // array con los datos de los certificados
    this.cers = [cer1, cer2];

    // certificado actual
    this.cerAct = 0;
  }

  // Creación de los elementos que componen el nivel 1
  create() {
    // se crea el primer certificado de auntenticidad
    this.newCer();

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
      this.nextCer();
    });
  }

  newCer(){
    // si se está en el último certificado no se instancia uno nuevo
    if(this.cerAct === this.cers.length){
      ++this.cerAct;
    }
    // se instancia un nuevo certificado
    else {
      this.cerInst = new Authenticity_Certificate(this.cers[this.cerAct].p1, this.cers[this.cerAct].p2, this.cers[this.cerAct].p3, this.cers[this.cerAct].p4, this.cers[this.cerAct].p5, this.cers[this.cerAct].p6, this.cers[this.cerAct].p7, this.cers[this.cerAct].p8, this.cers[this.cerAct].p9, this.cers[this.cerAct].p10);
      ++this.cerAct;
    }
  }

  // se destruye el certificado anterior y se pasa al siguiente
  nextCer(){
    this.cerInst.destroy();  // tendría que ser un método de la estatua
    this.newCer();
  }

  update(t, dt){
    this.elapsed_Time += dt;

    // si ha pasado el suficiente tiempo para que termine la jornada, la estatua actual obviamente no se considera que se haya comprobado
    if(this.elapsed_Time > this.timer * 60 * 1000 || this.cerAct > this.cers.length){
      this.elapsed_Time = 0;
      // se para la escena actual
      this.scene.pause(this.scene.key);
      // se lanza encima la pantalla final
      // se pasa a la pantalla final la puntuación
      // los datos que se pasen de una escena a otra hay que pasarlos como los parámetros de un objeto, aunque solo sea uno
      // la puntuación es el número de estatuas que se han revisado menos el número de fallos
      this.scene.launch('end', {score: this.cerAct - this.score.getScore() - 1});
    }
  }

}