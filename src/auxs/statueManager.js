import Pool from './pool.js';
import StatueLv1 from '../objects/statues/statueLv1.js';
import StatueLv2 from '../objects/statues/statueLv2.js';
import StatueLv3 from '../objects/statues/statueLv3.js';

export default class StatueManager {
	constructor(scene, dayNumber){
		this.scene = scene;
		// contador con las estatuas que se han comprobado
		this.cont = 0;

		this.createSounds();

		// se crea la pool de estatuas
		this.createPool(dayNumber);
		// se crea la primera estatua
		this.createStatue();
	}

	// se crean los sonidos de acierto y de fallo
	createSounds() {
		const config = {
	        mute: false,
	        volume: 0.7,
	        rate: 1,
	        detune: 0,
	        seek: 0,
	        loop: false,
	        delay: 0,
	    };
	    this.success = this.scene.sound.add("success", config);
	    this.error = this.scene.sound.add("error", config);
	}

	// info de las estatuas almacenado en un archivo .json
	createInfo(dayNumber) {
		return JSON.parse(this.scene.game.cache.text.get("day" + dayNumber));
    }

    createPool(dayNumber) {
		let statuesInfo = this.createInfo(dayNumber);

		let statueType = this.dayToNameClass(dayNumber);

		// se crean las estatuas a partir de la información y se guardan en un array
		let statues = [];
		// en un arrow function se puede quitar el paréntesis de un argumento si solo se trata de uno
		statuesInfo.forEach((info) => {
           statues.push(new statueType(this.scene, info));
        });

        // se crea la pool de estatuas
    	this.statuesPool = new Pool(this.scene, statues);
    }

    // convierte el día dado en el nombre de la clase
    // si en vez de utilizar clases, se utilizara prototype se podría convertir un string
    // en el nombre de la clase haciendo window[string]
    // window es un objeto global que contiene como propiedades todos los prototypes, pero no las clases
    // [string] sirve para acceder al valor del string
    dayToNameClass(dayNumber) {
    	let type;
    	switch (dayNumber) {
    		case 1:
    			type = StatueLv1;
    			break;
    		case 2:
    			type = StatueLv2;
    			break;
    		case 3:
    			type = StatueLv3;
    			break;
    	}
    	return type;
	}

    createStatue(){ 
    	this.statueInst = this.statuesPool.spawn();
    	// se aumenta el contador de estatuas que han llegado al mostrador
    	++this.cont;
  	}

  	// se destruye la estatua anterior y se pasa a la siguiente
  	nextStatue(type){ 
  		// si se ha comprobado mal, se añade un error
    	if(this.statueInst.canPass(type)) {
      		this.scene.fails.addFail();
      		// sonido fallo
      		this.error.play();
    	}
    	else { 
    		// sonido acierto
    		this.success.play();
    	}
    	this.statuesPool.release(this.statueInst);
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

  	getGroup() {
  		return this.statuesPool.group;
  	}
}