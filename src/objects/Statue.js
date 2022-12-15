export default class Statue extends Phaser.GameObjects.Sprite {
	constructor(scene, info) {
		super(scene, scene.game.config.width / 2, 217.5, info.sprite);
		this.scene.add.existing(this);

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

		this.arrive = this.scene.tweens.add({
		    targets: [ this ],
		    x: this.scene.game.config.width / 2,
		    y: 112,
		    scaleX: 0.5,
		    scaleY: 0.5,
		    duration: 1000,
		    ease: 'Sine.easeInOut',
		    paused: true,
		    flipX: false,
		    yoyo: false,
		    repeat: 0,
		    delay: 1
		});

		this.arrive.on('complete', () => {
			// se activa el ratón
            this.scene.input.mouse.manager.enabled = true;
			this.emit('statueHasArrived');
		})
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

	// se reproduce el tween con la llegada de la estatua
	arriving() {
		this.arrive.play();
	}

	// se comprueba si la estatua puede pasar o no
	canPass(type) {
		return this.pass !== type;
	}

	// COMPARADOR
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