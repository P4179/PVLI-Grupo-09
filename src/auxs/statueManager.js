export default class StatueManager extends Phaser.GameObjects.GameObject {
	constructor(scene, text){
		super(scene)

		this.scene.add.existing(this);

		// se crea el array con las estatuas
		this.statues = [];
		// contador con las estuas que se han comprobado
		this.cont = 0;

		this.createInfo(text);
	}

	createInfo(text){
		let lines = this.scene.cache.text.get(text);
		let info = lines.split('\n');

		// eliminar '\r' del texto porqque al hacer un salto de línea hay un
		// '\n' al final de la línea y un '\r' al principio de la nueva línea
		for (var i = 0; i < info.length; ++i) {
      		info[i] = info[i].replace('\r', '');
      	}

      	let nStatues = info[0];
      	let nParameters = info[1];

      	for (var i = 0; i < nStatues; ++i) {
      		// crear el array que guarda la información de la estatua
      		let statue = [];
      		for (var j = 0; j < nParameters; ++j) {
      			statue[j] = info[2 * i + 4 + i * nParameters + j];
      		}
      		this.statues[i] = statue;
      	}
    }

    createStatue(newStatue){ 
    	this.statueInst = newStatue;
    	// se aumenta el contador de estatuas que han llegado al mostrador
    	++this.cont;
  	}

  	init(){
  		this.statueAct = 0;
  	}

  	passStatue(){
  		// si se ha llegado a la última estatua, se vuelve a la primera
    	if(this.end()){
      		// estatua actual
      		// corresponde con el índice del array de la info de estatuas
      		this.statueAct = 0;
    	}
    	// como ya hay una estatua instanciada, se instancia la siguiente
    	else {
      		++this.statueAct;
    	}
  	}

  	// se destruye la estatua anterior y se pasa a la siguiente
  	nextStatue(type){ 
    	if(this.statueInst.canPass(type)){
      		this.scene.fails.addFail();
    	}
    	this.statueInst.destroyMe();
    	this.passStatue();
  	}

  	// comprueba si se ha llegado al final del array con la información de las estatuas
  	end(){
  		return this.statueAct === this.statues.length - 1;
  	}

  	// devuelve el número de aciertos del jugador al comprobar las estatuas
  	getSuccess(){
  		// se resta uno porque la última estatua no se cuenta
  		let success = this.cont - 1 - this.scene.fails.getFails();
  		if(success < 0) {
  			success = 0;
  		}
  		return success;
  	}
}