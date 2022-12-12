import Manual from '../objects/manual.js';
import StatueManagerLv1 from '../auxs/statueManagerLv1.js';
import DayBase from './dayBase.js'

// Escena que se trata del nivel 1 del juego

export default class Day1 extends DayBase {
  // Constructor de la escena
  constructor() {
    super(1);
  }

  preload() {
      this.load.text('level1', 'assets/texts/level1.txt');
  }

  // Creación de los elementos que componen el nivel 1
  // el código que hay en el create se vuelve a ejecutar cuando se haya cargado la escena de nuevo, 
  // sin embargo, el constructor solo se ejecuta una vez
  create() {
    super.create();

    const CANVAS_WIDTH = this.game.config.width;
    const CANVAS_HEIGHT = this.game.config.height;

    // se crea el manual
    new Manual(this, 650, CANVAS_WIDTH/4, false);

    // se crea el botón de rayos X
    // new XRAY(this, 100, 380);

    // los botones sí y no acceden al statueManager para llamar al método que instancia la siguiente estatua
    this.statueManager = new StatueManagerLv1(this);
  }
}