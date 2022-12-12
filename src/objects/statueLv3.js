import Statue from './statue.js';
import Authenticity_Certificate from './authenticity_certificate.js';
import Identity_Suplement from './identity_suplement.js';

export default class StatueLv3 extends Statue {
	constructor(scene, info) {
		super(scene, info);

		this.content = info.rx;

		const CANVAS_WIDTH = this.scene.game.config.width;
		const CANVAS_HEIGHT = this.scene.game.config.height;

		this.ACDocument = new Authenticity_Certificate(this.scene, CANVAS_WIDTH / 2 - 160, CANVAS_HEIGHT / 2 - 50,
			info.name, info.expiration_date, info.photo, info.creation_date, info.serial_number);
		this.IDDocument = new Identity_Suplement(this.scene, CANVAS_WIDTH / 2 - 110, CANVAS_HEIGHT / 2 - 50,
			info.name2, info.serial_number2, info.expiration_date2, info.stamp);

		this.documents.add(this.ACDocument);
		this.documents.add(this.IDDocument);
	}

	showContent() {
		// se pone en negro la estatua
		this.setTint(Phaser.Display.Color.GetColor(10, 10, 10));

		// se muestra su contenido
		let Scontent = this.scene.add.image(this.x, this.y - 75, this.content);
		Scontent.setScale(0.6);
        setTimeout(() => {
        	this.setTint(Phaser.Display.Color.GetColor(1000, 1000, 1000));
	    	Scontent.destroy();
    	}, 3000);
	}
}