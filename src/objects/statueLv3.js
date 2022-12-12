import Statue from './statue.js';
import Authenticity_Certificate from './authenticity_certificate.js';
import Identity_Suplement from './identity_suplement.js';

export default class StatueLv3 extends Statue {
	constructor(scene, info) {
		super(scene, info);

		this.content = info[7];

		const CANVAS_WIDTH = this.scene.game.config.width;
		const CANVAS_HEIGHT = this.scene.game.config.height;

		this.ACDocument = new Authenticity_Certificate(this.scene, CANVAS_WIDTH / 2 - 160, CANVAS_HEIGHT / 2 - 50,
			info[2], info[3], info[4], info[5], info[6]);
		this.IDDocument = new Identity_Suplement(this.scene, CANVAS_WIDTH / 2 - 110, CANVAS_HEIGHT / 2 - 50,
			info[7], info[8], info[9], info[10]);
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

	destroyMe() {
		super.destroyMe();
		// cuando se destruye una estatua también se destruyen sus documentos
		this.ACDocument.destroyMe();
		this.IDDocument.destroyMe();
	}
}