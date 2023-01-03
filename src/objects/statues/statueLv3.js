import Statue from './statue.js';
import Authenticity_Certificate from './authenticity_certificate.js';
import Identity_Suplement from './identity_suplement.js';

export default class StatueLv3 extends Statue {
	constructor(scene, info) {
		super(scene, info);


		const CANVAS_WIDTH = this.scene.game.config.width;
		const CANVAS_HEIGHT = this.scene.game.config.height;

		this.ACDocument = new Authenticity_Certificate(this.scene, CANVAS_WIDTH / 2 - 160, CANVAS_HEIGHT / 2 - 50,
			info.name, info.expiration_date, info.photo, info.creation_date, info.serial_number);
		this.IDDocument = new Identity_Suplement(this.scene, CANVAS_WIDTH / 2 - 110, CANVAS_HEIGHT / 2 - 50,
			info.name2, info.serial_number2, info.expiration_date2, info.stamp);

		this.documents.add(this.ACDocument);
		this.documents.add(this.IDDocument);

		this.Scontent = this.scene.add.sprite(this.x, this.y / 2, info.rx).setScale(0.5);
		this.Scontent.setVisible(false);
	}

	showContent() {
		// se pone en negro la estatua
		this.setTint(Phaser.Display.Color.GetColor(10, 10, 10));
		this.Scontent.setVisible(true);
		this.scene.addXrayEffect();
		setTimeout(() => {      	
        	this.setTint(Phaser.Display.Color.GetColor(1000, 1000, 1000));
        	this.Scontent.setVisible(false);
	    	this.scene.removeXrayEffect();
	    	return true;
    	}, 2000);
	}
}