import Statue from './statue.js';
import Authenticity_Certificate from './authenticity_certificate.js';

export default class StatueLv1 extends Statue {
	constructor(scene, info) {
		super(scene, info);

		const CANVAS_WIDTH = this.scene.game.config.width;
		const CANVAS_HEIGHT = this.scene.game.config.height;

		this.ACDocument = new Authenticity_Certificate(this.scene, CANVAS_WIDTH / 2 - 160, CANVAS_HEIGHT / 2 - 50,
			info.name, info.expiration_date, info.photo, info.creation_date, info.serial_number);

		// se añade al grupo de documetnos
		this.documents.add(this.ACDocument);
	}
}