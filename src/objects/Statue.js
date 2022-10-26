import Documents from './Documents.js'
import Authenticity_Certificate from '../objects/Authenticity_Certificate.js'

export default class Estatua extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Estatua, estatua de terracota
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 * @param {boolean} continue - booleano que define si la estatua pasa o no
	 * @param {string} filename - nombre del archivo con el sprite
	 */
	constructor(scene, x, y, sprite, cont, xD, yD, sName, sCreationD, sSerialNumber, sExpirationD, sPhoto, sWear, sSculptor) {
		super(scene, x, y, 'estatua');
		this.scene.add.existing(this);

		this.pasar = cont;

		//sprite de la estatua
		let spriteStatue = this.scene.add.sprite(x, y, sprite);
		//spriteStatue.setScale(0.73);
		/*
		// Creamos las animaciones de nuestra estatua
		this.scene.anims.create({
			key: 'idle',
			frames: scene.anims.generateFrameNumbers('estatua', {start:0, end:0}),
			frameRate: 5,
			repeat: -1
		});

		// Si la animación de entrada se completa pasamos a ejecutar la animación 'idle'
		this.on('animationcomplete', end => {
			if (this.anims.currentAnim.key === 'entrada'){
				this.stopEntrada()
			}
		})

		// La animación a ejecutar según se genere el personaje será 'idle'
		this.play('idle');
		*/
		
		let ACDocument = new Authenticity_Certificate(scene, xD, yD, sName, sCreationD, sSerialNumber, sExpirationD, sPhoto, sWear, sSculptor);
		
	}

	canpass(){
		return this.pasar;
	}

	destroy(){

	}

}