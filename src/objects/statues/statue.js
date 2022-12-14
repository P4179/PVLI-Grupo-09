export default class Statue extends Phaser.GameObjects.Sprite {
	constructor(scene, info) {
		super(scene, scene.game.config.width / 2, 217.5, info.sprite);
		this.scene.add.existing(this);
		
		this.scene.physics.add.existing(this);
		// se ajusta el tamaño del body, inicialmente es el del sprite
		this.body.setSize(this.width / 3.5, this.height - 120).setImmovable(true);

		this.setPosition(this.scene.game.config.width / 2, 195);
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
				this.setCompVar(this.sprite);
			}
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
			this.emit('statueHasArrived');
			// se activa el ratón
			this.scene.input.mouse.manager.enabled = true;
		})
	}

	// comparar los parámetors de los documentos que traen las estatuas
	preUpdate(t, dt){
		super.preUpdate(t, dt);
		if(this.comparatorActive){
			if(this.compVar1 !== null && this.compVar2 !== null){
				// si se está comprobando la imagen con la estatua
				if((this.compVar1.type !== 'BitmapText' && this.compVar2.type !== 'BitmapText') &&
				(this.notStatueSprite(this.compVar1) || this.notStatueSprite(this.compVar2))) {
					let l;
					if(this.notStatueSprite(this.compVar1))
						l = this.compVar1.texture.key.split('_');
					else
						l = this.compVar2.texture.key.split('_');
					console.log(l[l.length - 1]);
					if(l[l.length - 1] !== 'Fake')
						this.scene.HUD.showComparatorText('Correct');
					else 
						this.scene.HUD.showComparatorText('Incorrect');
				}
				else if(this.compVar1.text === this.compVar2.text) {
					this.scene.HUD.showComparatorText('Correct');
				}
				else {
					this.scene.HUD.showComparatorText('Incorrect');
				}
			}
		}
	}

	getDocuments() {
		return this.documents;
	}

	resetDocumentDepths(){
		this.documents.children.each(function (d) {
			d.setDepth(0);
		}, this);
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
			if(this.compVar1 !== this.sprite)
				this.compVar1.setTintFill(0xFF21FF);
		}
		else if(this.compVar2 == null && v != this.compVar1){
			this.compVar2 = v;
			if(this.compVar2 !== this.sprite)
				this.compVar2.setTintFill(0xFF21FF);
		}
		else {
			if(this.compVar1.isTinted)
				this.compVar1.clearTint();
			this.compVar1 = v;
			if(this.compVar2 !== null && this.compVar2.isTinted)
				this.compVar2.clearTint();
			this.compVar1.setTintFill(0xFF21FF);
			this.compVar2 = null;
		}
	}

	resetVars(){
		if(this.compVar1 !== null && this.notStatueSprite(this.compVar1) && this.compVar1.isTinted)
			this.compVar1.clearTint();
		if(this.compVar2 !== null && this.notStatueSprite(this.compVar2) && this.compVar2.isTinted)
			this.compVar2.clearTint();
		this.compVar1 = null;
		this.compVar2 = null;
	}

	notStatueSprite(GO){
		return GO !== this.sprite;
	}
}
