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

		//this.setOrigin(0.5, 1);
		//this.setOrigin(0.5, 1);
		//this.setScale(0.5);
		this.setPosition(this.scene.sys.canvas.width / 2, 195);
		this.setScale(0);

		this.sprite = info.sprite;
		this.pass = info.pass;
		this.setInteractive();

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

		this.on('pointerdown', () => {
			if(this.comparatorActive){
				console.log(this.sprite);
				this.setCompVar(this.sprite);
			}
			// this.scene.getStatue().setCompVar(this);
		});

		/*
		// Si la animación de entrada se completa pasamos a ejecutar la animación 'idle'
		this.on('animationcomplete', end => {
			if (this.anims.currentAnim.key === 'entrada'){
				this.stopEntrada()
			}
		})
		*/

		let tween = this.scene.tweens.add({
		    targets: [ this ],
		    x: this.scene.sys.canvas.width / 2,
		    y: 112,
		    scaleX: 0.5,
		    scaleY: 0.5,
		    duration: 1000,
		    ease: 'Sine.easeInOut',
		    //ease: 'Linear',
		    flipX: false,
		    yoyo: false,
		    repeat: 0,
		    delay: 1
		});

		tween.on('stop', listener);

		function listener() {
		    // hacemos algo cuando termina el tween
		}
	}

	canPass(type) {
		return this.pass !== type;
	}

	// comparar los parámetors de los documentos que traen las estatuas
	preUpdate(t, dt){
		super.preUpdate(t, dt);
		if(this.comparatorActive){
			if(this.compVar1 !== null && this.compVar2 !== null){
				if(this.compVar1 === this.sprite || this.compVar2 === this.sprite) {
					let l = this.sprite.split('_');
					// console.log(l[l.length]);
					if(l[l.length] !== 'FAKE')
						console.log('Correct');
					else 
						console.log('Incorrect');
				}
				else if(this.compVar1.text === this.compVar2.text) {
					console.log('Correct');
				}
				else {
					console.log('Inorrect');
				}
				this.resetVars();
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
		else if(this.compVar2 == null && v != this.compVar1){
			this.compVar2 = v;
		}
		else {
			this.compVar1 = v;
			this.compVar2 = null;
		}
	}

	resetVars(){
		this.compVar1 = null;
		this.compVar2 = null;
	}
}