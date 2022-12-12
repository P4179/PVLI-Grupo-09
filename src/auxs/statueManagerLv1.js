import StatueLv1 from '../objects/statueLv1.js';
import StatueManager from './statueManager.js';

export default class StatueManagerLv1 extends StatueManager {
	constructor(scene){
		super(scene, 'level1');

		// se crea la primera estatua
		this.init();
	}

	init(){
		super.init();
		this.createStatue();
	}

	createStatue(){
		super.createStatue(new StatueLv1(this.scene, this.statues[this.statueAct]));
	}

	nextStatue(type){
		super.nextStatue(type);
		this.createStatue();
	}
}