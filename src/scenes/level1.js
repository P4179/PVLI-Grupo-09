import Clock from '../objects/clock.js';
import Fails from '../objects/fails.js';
import Estatua from '../objects/Statue.js';
import Buttons_Yes_No from '../objects/button_yes_no.js';
import Manual from '../objects/manual.js';

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

    // se añade el fondo a la estatua
    // todos los sprites se añaden después del fondo porque sino quedan debajo
    this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(CANVAS_WIDTH, CANVAS_HEIGHT);

    this.elapsed_Time = 0;
    // tiempo que tiene que pasar para que se cambie de escena
    this.timer = 1;

    new Buttons_Yes_No(this, CANVAS_WIDTH - 100, 380, true);
    new Buttons_Yes_No(this, CANVAS_WIDTH - 100, 530, false);

    // se instancia el reloj
    // se pasa la fecha como un solo objeto con tres parámetros
    new Clock(this, 90, CANVAS_HEIGHT - 70, {d: 15, m: 10, y: 2022});

    // instancia de Fails
    this.fails = new Fails(this, CANVAS_WIDTH - 10, 10);

    this.infoStatues(CANVAS_WIDTH, CANVAS_HEIGHT);

    // estatua instanciada
    // si es null quiere decir que no hay ninguna estatua instanciada
    this.statueInst = null;
    // se crea la primera estatua
    this.newStatue();
    new Manual(this, 650, CANVAS_WIDTH/4, false);
  }

  infoStatues(canvasWidth, canvasHeight){
    const POS_X = canvasWidth/2;
    const POS_Y = 220;
    const POS_X_CERT = canvasWidth/2 - 170;
    const POS_Y_CERT = canvasHeight/2 - 70;

    // datos de las estatuas y los certificados
    let statue1 = {
      escena: this,
      posX: POS_X,
      posY: POS_Y,
      sprite: "idle_man_1",
      pass: false,
      posXCert: POS_X_CERT,
      posYCert: POS_Y_CERT,
      name: "Huang",
      creation: {d: 23, m: 9, y: -218},
      number: "0010",
      expiration: {d: 28, m: 10, y: 2005},
      photo: 'man1_Fake',
      wear: 500,  // hay que quitarlo
      sculptor: "juan" // hay que quitarlo
    }

    let statue2 = {
      escena: this,
      posX: POS_X,
      posY: POS_Y,
      sprite: "idle_man_2",
      pass: false,
      posXCert: POS_X_CERT,
      posYCert: POS_Y_CERT,
      name: "Chang",
      creation: {d: 25, m: 2, y: -232},
      number: "0011",
      expiration: {d: 1, m: 12, y: 2000},
      photo: 'idle_man_2',
      wear: 500,  // hay que quitarlo
      sculptor: "juan" // hay que quitarlo
    }

    let statue3 = {
      escena: this,
      posX: POS_X,
      posY: POS_Y,
      sprite: "man3",
      pass: true,
      posXCert: POS_X_CERT,
      posYCert: POS_Y_CERT,
      name: "Jian",
      creation: {d: 8, m: 10, y: -222},
      number: "0100",
      expiration: {d: 16, m: 5, y: 2030},
      photo: 'man3',
      wear: 500,  // hay que quitarlo
      sculptor: "juan" // hay que quitarlo
    }

    let statue4 = {
      escena: this,
      posX: POS_X,
      posY: POS_Y,
      sprite: "man4",
      pass: true,
      posXCert: POS_X_CERT,
      posYCert: POS_Y_CERT,
      name: "Mao Mao",
      creation: {d: 9, m: 11, y: -245},
      number: "0110",
      expiration: {d: 16, m: 4, y: 2032},
      photo: 'man4',
      wear: 500,  // hay que quitarlo
      sculptor: "juan" // hay que quitarlo
    }

    let statue5 = {
      escena: this,
      posX: POS_X,
      posY: POS_Y,
      sprite: "woman1",
      pass: true,
      posXCert: POS_X_CERT,
      posYCert: POS_Y_CERT,
      name: "???",
      creation: {d: 9, m: 11, y: -245},
      number: "0111",
      expiration: {d: 16, m: 4, y: 2032},
      photo: 'woman1',
      wear: 500,  // hay que quitarlo
      sculptor: "juan" // hay que quitarlo
    }

    // array con los datos de las estatuas y los certificados
    //this.statues = [statue1, statue2, statue3, statue4, statue5];
    this.statues = [statue1, statue2, statue3, statue4];
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
      this.statueInst = new Estatua(this.statues[this.statueAct].escena, 
        this.statues[this.statueAct].posX, 
        this.statues[this.statueAct].posY, 
        this.statues[this.statueAct].sprite, 
        this.statues[this.statueAct].pass,
        this.statues[this.statueAct].posXCert, 
        this.statues[this.statueAct].posYCert, 
        this.statues[this.statueAct].name, 
        this.statues[this.statueAct].creation, 
        this.statues[this.statueAct].number, 
        this.statues[this.statueAct].expiration,
        this.statues[this.statueAct].photo, 
        this.statues[this.statueAct].wear, 
        this.statues[this.statueAct].sculptor);
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

}