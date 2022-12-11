import Estatua from '../objects/statue.js';
import Manual from '../objects/manual.js';
import HUD from '../auxs/HUD.js';
import XRAY from '../objects/xray.js';

// Escena que se trata del nivel 1 del juego

export default class Level1 extends Phaser.Scene {
  // Constructor de la escena
  constructor() {
    super({ key: 'level1' });
  }

  // Creación de los elementos que componen el nivel 1
  // el código que hay en el create se vuelve a ejecutar cuando se haya cargado la escena de nuevo, 
  // sin embargo, el constructor solo se ejecuta una vez
  create() {
    const CANVAS_WIDTH = this.sys.canvas.width;
    const CANVAS_HEIGHT = this.sys.canvas.height;

    this.infoStatues();

    this.HUD = new HUD(this);
    this.fails = this.HUD.getFailsObject();

    // se crea el manual
    new Manual(this, 650, CANVAS_WIDTH/4, false);
    new XRAY(this, 100, 380);
    this.infoStatues();

    // estatua instanciada
    // si es null quiere decir que no hay ninguna estatua instanciada
    this.statueInst = null;
    // se crea la primera estatua
    this.newStatue();
  }

  infoStatues(){
    // datos de las estatuas y los certificados
    let statue1 = {
      scene: this,
      sprite: "idle_man_1",
      pass: false,
      name: "Huang",
      creation: {d: 23, m: 9, y: -218},
      number: "0010",
      expiration: {d: 28, m: 10, y: 2005},
      photo: 'man1_Fake'
    }

    let statue2 = {
      scene: this,
      sprite: "idle_man_2",
      pass: false,
      name: "Chang",
      creation: {d: 25, m: 2, y: -232},
      number: "0011",
      expiration: {d: 1, m: 12, y: 2000},
      photo: 'idle_man_2'
    }

    let statue5 = {
      scene: this,
      sprite: "idle_woman_1",
      pass: true,
      name: "???",
      creation: {d: 9, m: 11, y: -245},
      number: "0111",
      expiration: {d: 16, m: 4, y: 2032},
      photo: 'woman1'
    }

    // array con los datos de las estatuas y los certificados
    this.statues = [statue1, statue2, statue5];
  }

  newStatue(){ 
    // como no hay ninguna estatua instanciada, hay que instanciar la primera
    if(this.statueInst === null){
      // estatua actual
      // corresponde con el índice del array de la info de estatuas
      this.statueAct = 0;
    }
    // como ya hay una estatua instanciada, se instancia la siguiente
    else {
      ++this.statueAct;
    }

    if(this.statueAct != this.statues.length){
      this.statueInst = new Estatua(this.statues[this.statueAct]);
    }
  }

  // se destruye la estatua anterior y se pasa a la siguiente
  nextStatue(button){ 
    if(this.statueInst.canPass() !== button){
      this.fails.addFail();
    }

    this.statueInst.destroyMe();
    this.newStatue();
  }

  update(t, dt){
    this.elapsed_Time += dt;

    // si ha pasado el suficiente tiempo para que termine la jornada, la estatua actual obviamente no se considera que se haya comprobado
    if(this.elapsed_Time > this.timer * 60 * 1000 || this.statueAct >= this.statues.length){
      // se para la escena actual
      this.scene.pause(this.scene.key);
      // se lanza encima la pantalla final
      // se pasa a la pantalla final la puntuación
      // los datos que se pasen de una escena a otra hay que pasarlos como los parámetros de un objeto, aunque solo sea uno
      // la puntuación es el número de estatuas que se han revisado menos el número de fallos
      this.scene.launch('end', {score: this.statueAct - this.fails.getFails()});
    }
  }

  getHUD(){
    return this.HUD;
  }

  getStatue() {
    return this.statueInst;
  }

}