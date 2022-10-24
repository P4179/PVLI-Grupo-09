import Clock from '../objects/clock.js';
import Score from '../objects/score.js';
import Authenticity_Certificate from '../objects/Authenticity_Certificate.js'

// Escena que se trata del nivel 1 del juego

export default class Level1 extends Phaser.Scene {
  // Constructor de la escena
  constructor() {
    super({ key: 'level1' });
    this.elapsed_Time = 0;
  }

  // Creación de los elementos que componen el nivel 1
  create() {
    //se crea el certificado de autenticidad y dos fechas
    new Authenticity_Certificate(this, 600, 300, "Balls", {d: 22, m: 2, y: -933}, "01001", {d: 11, m: 1, y: 2222}, 'man2_Fake', 500, "nombredeartista");
    // se instancia el reloj
    // se pasa la fecha como un solo objeto con tres parámetros
    new Clock(this, 100, 400, {d: 2, m: 3, y: 5});
    // new Authenticity_Certificate(this, 500, 300, "Balls", new Date(22, 2, -235), "01001", new Date(11, 11, 2055), 'man1', 500, "aaaa");
    }

  update(t, dt){
    // si han pasado 10 segundos se superpone la escena de la pantalla final a la actual
    // y se para la escena actual para que no se continue ejecutando
    this.elapsed_Time += dt;
    console.log(this.elapsed_Time);
    if(this.elapsed_Time > 10000){
      this.elapsed_Time = 0;
      // se para la escena actual
      this.scene.pause(this.scene.key);
      // se lanza encima la pantalla final
      this.scene.launch('end');
    }
  }

}