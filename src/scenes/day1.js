import Manual from '../objects/manual.js';
import StatueManagerLv1 from '../auxs/statueManagerLv1.js';
import DayBase from './dayBase.js';

// Escena que se trata del nivel 1 del juego

export default class Day1 extends DayBase {
  // Constructor de la escena
  constructor() {
    super(1, {d:15, m:10, y:2022});
  }

  // Creación de los elementos que componen el nivel 1
  // el código que hay en el create se vuelve a ejecutar cuando se haya cargado la escena de nuevo, 
  // sin embargo, el constructor solo se ejecuta una vez
  create() {
    super.create();

    localStorage.setItem('score', 0);

    const CANVAS_WIDTH = this.game.config.width;
    const CANVAS_HEIGHT = this.game.config.height;

    // se crea el manual
    new Manual(this, 650, CANVAS_WIDTH/4, false);

    // los botones sí y no acceden al statueManager para llamar al método que instancia la siguiente estatua
    this.statueManager = new StatueManagerLv1(this, 'day1');
  }
}