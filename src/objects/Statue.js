import Authenticity_Certificate from './Authenticity_Certificate.js'

export default class Estatua extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Estatua, estatua de terracota
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 * @param {boolean} continue - booleano que define si la estatua pasa o no
	 * @param {string} filename - nombre del archivo con el sprite
	 */
	constructor(scene, x, y, sprite, pass, xD, yD, sName, sCreationD, sSerialNumber, sExpirationD, sPhoto) {
		super(scene, x, y, sprite);
		this.scene.add.existing(this);

		this.setOrigin(0.5, 1);

		this.setScale(0.5);

		this.pass = pass;
		// Creamos las animaciones de nuestra estatua
		this.scene.anims.create({
			key: 'idle' + sprite,
			frames: this.anims.generateFrameNumbers(sprite, {start:0, end:10}),
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
		this.play('idle' + sprite);
		
		
		this.ACDocument = new Authenticity_Certificate(scene, xD, yD, sName, sCreationD, sSerialNumber, sExpirationD, sPhoto);
		
	}

	canPass(){
		return this.pass;
	}

	destroyMe(){
		this.destroy();
		// cuando la estatua se destruye también se destruyen los documentos que tiene asociados
		this.ACDocument.destroyMe();
	}
}