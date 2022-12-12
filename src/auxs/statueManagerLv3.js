import StatueLv3 from '../objects/statueLv3.js';
import StatueManager from './statueManager.js';

export default class StatueManagerLv3 extends StatueManager {
	constructor(scene, text){
		super(scene, text);

		// se crea la primera estatua
		this.createPool(text);
		this.createStatue();
	}

	createPool(text) {
		// info de las estatuas
		let statuesInfo = super.createInfo(text);

		// crea las estatuas a partir de la información y las guarda en un array
		let statues = [];
		// en un arrow function se puede quitar el paréntesis de un argumento si solo se trata de uno
		statuesInfo.forEach((info) => {
           statues.push(new StatueLv3(this.scene, info));
        });
        // crea la pool de estatuas
        super.createPool(statues);
	}
}