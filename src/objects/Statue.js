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
		this.comparatorActive = false;
		this.compVar1 = null;
		this.compVar2 = null;

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

		this.documents = this.scene.add.group();

		this.ACDocument = new Authenticity_Certificate(statueInfo.scene, this.scene.sys.canvas.width / 2 - 160, this.scene.sys.canvas.height / 2 - 50,
			statueInfo.name, statueInfo.creation, statueInfo.number, statueInfo.expiration, statueInfo.photo);

		//Se pasa el numero del stamp que se quiere
		this.APDocument = new Author_Paper(statueInfo.scene, this.scene.sys.canvas.width / 2 - 110, this.scene.sys.canvas.height / 2 - 50,
			statueInfo.name, statueInfo.number, statueInfo.expiration, 2);

		this.MRDocument = new Material_Record(statueInfo.scene, this.scene.sys.canvas.width / 2 - 110, this.scene.sys.canvas.height / 2 - 50,
			statueInfo.name, statueInfo.creation);

		//se anaden los documentos al grupo
		this.documents.add(this.ACDocument);
		this.documents.add(this.APDocument);
		this.documents.add(this.MRDocument);
	}

	preUpdate(t, dt){
		super.preUpdate(t, dt);
		if(this.comparatorActive){
			if(this.compVar1 !== null && this.compVar2 !== null){
				if(this.compVar1 === this.compVar2) {
					console.log('Correct');
				}
				else {
					console.log('Inorrect');
				}
			}
		}
	}

	canPass() {
		return this.pass;
	}

	getDocuments() {
		return this.documents;
	}

	comparator(state) {
		this.comparatorActive = state;
		this.documents.children.each(function (doc) {
			doc.comparatorSwitch(state);
		}, this);
	}

	setCompVar(v){
		if(this.compVar1 === null){
			this.compVar1 = v;
		}
		else if(this.compVar2 === null){
			this.compVar2 = v;
			this.varCounter++;
		}
		else {
			this.compVar1 = v;
			this.compVar2 = null;
		}
	}

	destroyMe() {
		this.destroy();
		// cuando la estatua se destruye también se destruyen los documentos que tiene asociados
		this.documents.children.each(function (doc) {
			doc.destroyMe();
		}, this);
	}
}