import StatueLv1 from '../objects/statueLv1.js';
import StatueManager from './statueManager.js';

export default class StatueManagerLv1 extends StatueManager {
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
           statues.push(new StatueLv1(this.scene, info));
        });
        // crea la pool de estatuas
        super.createPool(statues);
	}
}