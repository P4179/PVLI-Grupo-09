import Statue from './statue.js';
import Authenticity_Certificate from './authenticity_certificate.js';
import Material_Record from './material_record.js';

export default class StatueLv2 extends Statue {
	constructor(scene, info) {
		super(scene, info);

		this.impacted = this.scene.tweens.add({
			targets: this,
			x: this.x + 30,
			duration: 400,
			ease: 'Expo.easeOut',
			paused: true,
			yoyo: true,
			repeat: 0
		});

		const CANVAS_WIDTH = this.scene.game.config.width;
		const CANVAS_HEIGHT = this.scene.game.config.height;		

		this.ACDocument = new Authenticity_Certificate(this.scene, CANVAS_WIDTH / 2 - 160, CANVAS_HEIGHT / 2 - 50,
			info.name, info.expiration_date, info.photo, info.creation_date, info.serial_number);
		this.MRDocument = new Material_Record(this.scene, CANVAS_WIDTH / 2 - 110, CANVAS_HEIGHT / 2 - 50,
			info.name, info.creation_date2, info.color);

		this.documents.add(this.ACDocument);
		this.documents.add(this.MRDocument);
	}
}