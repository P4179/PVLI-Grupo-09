import Pool from './pool.js';

export default class StatueManager {
	constructor(scene){
		this.scene = scene;
		// contador con las estatuas que se han comprobado
		this.cont = 0;
	}

	createInfo(text) {
		return JSON.parse(this.scene.game.cache.text.get(text));
    }

    createPool(entities) {
    	this.statuesPool = new Pool(this.scene, entities);
    }

    createStatue(){ 
    	this.statueInst = this.statuesPool.spawn();
    	// se aumenta el contador de estatuas que han llegado al mostrador
    	++this.cont;
  	}

  	// se destruye la estatua anterior y se pasa a la siguiente
  	nextStatue(type){ 
  		// si se ha comprobado mal, se añade un error
    	if(this.statueInst.canPass(type)){
      		this.scene.fails.addFail();
    	}
    	this.statuesPool.release(this.statueInst);
    	// this.statueInst.destroyMe();
    	// this.passStatue();
    	this.createStatue();
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