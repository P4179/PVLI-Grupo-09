import Clock from '../objects/clock.js';
import Authenticity_Certificate from '../objects/Authenticity_Certificate.js'
import Documents from '../objects/Documents.js'
import Date from "../classes/Date.js";


// Escena que se trata del nivel 1 del juego

export default class Level1 extends Phaser.Scene {
  // Constructor de la escena
  constructor() {
    super({ key: 'level1' });
  }

  // Creación de los elementos que componen el nivel 1
  create() {
    // cambiar el color del fondo a blanco
    this.cameras.main.backgroundColor.setTo(255, 255, 255);
    new Clock(this, 300, 300, "23/10/2022");
    let creaDate = new Date(22, 2, -235)
    let expiDate = new Date(11, 11, 2055)
    new Authenticity_Certificate(this, 600, 300, "Balls", creaDate, "01001", expiDate, 'man1', 500, "nombredeartista");
  }

  update(t, dt){
    // si han pasado 10 segundos se suporne la escena de la pantalla final a la actual
    // y se para la escena actual para que no se continue ejecutando
    // console.log(t);
    // if(t > 10000){
    //   // se para la escena actual
    //   this.scene.pause(this.scene.key);
    //   // se lanza encima la pantalla final
    //   this.scene.launch('end');
    // }
  }

}