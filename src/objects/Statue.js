import Authenticity_Certificate from './authenticity_certificate.js'
import Author_Paper from './author_paper.js';
import Material_Record from './material_record.js';

export default class Estatua extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Estatua, estatua de terracota
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 * @param {boolean} continue - booleano que define si la estatua pasa o no
	 * @param {string} filename - nombre del archivo con el sprite
	 */
	constructor(statueInfo) {
		super(statueInfo.scene, statueInfo.scene.sys.canvas.width / 2, 218, statueInfo.sprite);
		this.scene.add.existing(this);

		this.setOrigin(0.5, 1);
		this.setScale(0.5);

		this.pass = statueInfo.pass;

		// Creamos las animaciones de nuestra estatua
		this.scene.anims.create({
			key: 'idle' + statueInfo.sprite,
			frames: this.anims.generateFrameNumbers(statueInfo.sprite, {
				start: 0,
				end: 10
			}),
			frameRate: 6,
			repeat: -1
		});

		/*
		// Si la animación de entrada se completa pasamos a ejecutar la animación 'idle'
		this.on('animationcomplete', end => {
			if (this.anims.currentAnim.key === 'entrada'){
				this.stopEntrada()
			}
		})
		*/

		// La animación a ejecutar según se genere el personaje será 'idle'
		this.play('idle' + statueInfo.sprite);

		this.ACDocument = new Authenticity_Certificate(statueInfo.scene, this.scene.sys.canvas.width / 2 - 160, this.scene.sys.canvas.height / 2 - 50,
			statueInfo.name, statueInfo.creation, statueInfo.number, statueInfo.expiration, statueInfo.photo);

		//Se pasa el numero del stamp que se quiere
		this.APDocument = new Author_Paper(statueInfo.scene, this.scene.sys.canvas.width / 2 - 110, this.scene.sys.canvas.height / 2 - 50,
			statueInfo.name, statueInfo.number, statueInfo.expiration, 2);

		this.MRDocument = new Material_Record(statueInfo.scene, this.scene.sys.canvas.width / 2 - 110, this.scene.sys.canvas.height / 2 - 50,
			statueInfo.name, statueInfo.creation)

	}

	canPass() {
		return this.pass;
	}

	destroyMe() {
		this.destroy();
		// cuando la estatua se destruye también se destruyen los documentos que tiene asociados
		this.ACDocument.destroyMe();
		this.APDocument.destroyMe();
		this.MRDocument.destroyMe();
	}
}