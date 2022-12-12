export default class Statue extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Estatua, estatua de terracota
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 * @param {boolean} continue - booleano que define si la estatua pasa o no
	 * @param {string} filename - nombre del archivo con el sprite
	 */
	constructor(scene, info) {
		super(scene, scene.game.config.width / 2, 217.5, info.sprite);
		this.scene.add.existing(this);

		this.setOrigin(0.5, 1);
		this.setScale(0.5);

		this.sprite = info.sprite;
		this.pass = info.pass;

		// comparador
		this.comparatorActive = false;
		this.compVar1 = null;
		this.compVar2 = null;

		// se crea un grupo con los documentos, que se añadirán en los archivos de las clases hijas
		this.documents = this.scene.add.group();

		// Creamos las animaciones de nuestra estatua
		this.scene.anims.create({
			key: 'idle' + this.sprite,
			frames: this.anims.generateFrameNumbers(this.sprite, {
				start: 0,
				end: 10
			}),
			frameRate: 6,
			repeat: -1
		});

		// La animación a ejecutar según se genere el personaje será 'idle'
		this.play('idle' + this.sprite);

		/*
		// Si la animación de entrada se completa pasamos a ejecutar la animación 'idle'
		this.on('animationcomplete', end => {
			if (this.anims.currentAnim.key === 'entrada'){
				this.stopEntrada()
			}
		})
		*/
	}

	canPass(type) {
		return this.pass !== type;
	}

	// comparar los parámetors de los documentos que traen las estatuas
	preUpdate(t, dt){
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
}