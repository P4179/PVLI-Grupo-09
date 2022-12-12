import Statue from './statue.js';
import Authenticity_Certificate from './authenticity_certificate.js';

export default class StatueLv1 extends Statue {
	constructor(scene, info) {
		super(scene, info);

		const CANVAS_WIDTH = this.scene.game.config.width;
		const CANVAS_HEIGHT = this.scene.game.config.height;

		this.ACDocument = new Authenticity_Certificate(this.scene, CANVAS_WIDTH / 2 - 160, CANVAS_HEIGHT / 2 - 50,
			info[2], info[3], info[4], info[5], info[6]);

		this.documents.add(this.ACDocument);
	}
}