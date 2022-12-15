import Manual from '../objects/manual.js';
import StatueManagerLv3 from '../auxs/statueManagerLv3.js';
import DayBase from './dayBase.js';
import XRAY from '../objects/xray.js';
import ScalinePostFX from '/assets/pipelines/ScalinePostFX.js'; 

// Escena que se trata del nivel 1 del juego

export default class Day3 extends DayBase {
  // Constructor de la escena
  constructor() {
    super(3, {d:17, m:10, y:2022});
  }

  // Creación de los elementos que componen el nivel 1
  // el código que hay en el create se vuelve a ejecutar cuando se haya cargado la escena de nuevo, 
  // sin embargo, el constructor solo se ejecuta una vez
  create() {
    super.create();

    const CANVAS_WIDTH = this.game.config.width;
    const CANVAS_HEIGHT = this.game.config.height;

    // se crea el manual
    new Manual(this, 650, CANVAS_WIDTH/4, 3);

    // se crea el botón de rayos X
    new XRAY(this, this, CANVAS_WIDTH - 50, CANVAS_HEIGHT - 120, 'escaner');

    // los botones sí y no acceden al statueManager para llamar al método que instancia la siguiente estatua
    this.statueManager = new StatueManagerLv3(this, 'day3');
  }

  pauseScene(){
    this.scene.pause(this);
    this.cameras.main.setPostPipeline(ScalinePostFX);
  }

  resumeScene(){
    this.scene.resume(this);
    this.cameras.main.removePostPipeline(ScalinePostFX);
  }
}
