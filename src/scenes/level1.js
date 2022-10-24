import Clock from '../objects/clock.js';

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
  }

  update(t, dt){
    // si han pasado 10 segundos se suporne la escena de la pantalla final a la actual
    // y se para la escena actual para que no se continue ejecutando
    console.log(t);
    if(t > 10000){
      // se para la escena actual
      this.scene.pause(this.scene.key);
      // se lanza encima la pantalla final
      this.scene.launch('end');
    }
  }

}