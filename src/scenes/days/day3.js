import StatueManager from '../../auxs/statueManager.js';
import DayBase from './dayBase.js';
import XRAY from '../../objects/buttons/xray.js';
import ScalinePostFX from '../ScalinePostFX.js'; 

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

    // se crea el botón de rayos X
    new XRAY(this, this.game.config.width - 50, this.game.config.height - 125);

    // los capturadores de evento no se eliminan cuando se cambia de escena
    // Por lo tanto, si está escena se vuelve a activar y se utiliza this.scene.on hay dos capturades:
    // el de la vez pasada y el nuevo, entonces se crea la primera estatua dos veces
    // Para evitarlo se utiliza once que hace que se capture solo una vez
    this.events.once('startDay', () => {
      // los botones sí y no acceden al statueManager para llamar al método que instancia la siguiente estatua
        this.statueManager = new StatueManager(this, 3);
    });
  }

  addXrayEffect(){
    this.cameras.main.setPostPipeline(ScalinePostFX);
  }

  removeXrayEffect(){
    this.cameras.main.removePostPipeline(ScalinePostFX);
  }
}
