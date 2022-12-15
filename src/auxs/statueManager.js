import Pool from './pool.js';

export default class StatueManager {
	constructor(scene){
		this.scene = scene;
		// contador con las estatuas que se han comprobado
		this.cont = 0;

		const config = {
			mute: false,
	        volume: 0.7,
	        rate: 1,
	        detune: 0,
	        seek: 0,
	        loop: false,
	        delay: 0,
	    }; // config es opcional

	    this.success = this.scene.sound.add("success", config);
	    this.error = this.scene.sound.add("error", config);
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
  		// si se ha comprobado mal, se produce un error
    	if(this.statueInst.canPass(type)){
      		this.scene.fails.addFail();
      		// sonido fallo
      		this.error.play();
    	}
    	else{ 
    		// sonido acierto
    		this.success.play();
    	}

    	this.statuesPool.release(this.statueInst);
    	// cuando se desactiva una estatua deja de poder meter input con el ratón
    	// cuando la nueva estatua haya llegado ya podrá meterlo de nuevo
        this.scene.input.mouse.manager.enabled = false;

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