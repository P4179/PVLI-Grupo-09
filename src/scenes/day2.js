import StatueManagerLv2 from '../auxs/statueManagerLv2.js';
import DayBase from './dayBase.js';
import Button_Shoot from '../objects/button_shoot.js';

// Escena que se trata del nivel 1 del juego

export default class Day2 extends DayBase {
  // Constructor de la escena
  constructor() {
    super(2, {d:16, m:10, y:2022});
  }

  // Creación de los elementos que componen el nivel 1
  // el código que hay en el create se vuelve a ejecutar cuando se haya cargado la escena de nuevo, 
  // sin embargo, el constructor solo se ejecuta una vez
  create() {
    super.create();

    // se crea el botón de rayos X
    let button_shoot = new Button_Shoot(this, this.game.config.width - 50, this.game.config.height - 125);

    this.events.on('startDay', () => {
      // los botones sí y no acceden al statueManager para llamar al método que instancia la siguiente estatua
        this.statueManager = new StatueManagerLv2(this, 'day2');

        // se indica que la bola y el GRUPO de estatua colisionan y que cuando lo hagan
        // se produzca lo que hay en el arrow function
        // la función tiene como parámetros los objetos que han colisionado
        this.physics.add.collider(button_shoot.ball, this.statueManager.getGroup(), (ball, statue) => {
          // se para la fuerza horizontal de la bola y se la da una fuerza hacia arriba
          // la estatua reproduce su tween
          ball.hasCollided();
          statue.impacted.play();
        });
    })

  }
}