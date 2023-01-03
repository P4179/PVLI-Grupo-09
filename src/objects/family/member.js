export default class Continue extends Phaser.GameObjects.Container {
	constructor (scene, x, y, member, basicCares) {
		super(scene, x, y);

		this.scene.add.existing(this);

		this.basicCares = basicCares;
		this.member = member;

		// indica si el familiar estaba cuidado o no
		this.care = false;
		// indica si está marcado el botón de cuidar
		this.press = false;

		// se utiliza JSON.parse para convertir el string en un objeto con dos propiedades
		this.info = JSON.parse(localStorage.getItem(this.member));
		// se convierte en booleano porque lo que se guarda localmente es texto
		this.isDeath = this.info.death;

		// nombre del integrante de la familia
		let name = this.scene.add.bitmapText(0, 0, "generalFont", this.member)
			.setTintFill('0xFFFFFF').setOrigin(0.5, 0.5).setFontSize(25);
		this.add(name);

		// botón para cuidar al miembro de la familia o no
		// se hace que el sprite sea interactivo
		let button = this.scene.add.sprite(-90, 0, 'button_family').setScale(0.15).setInteractive();
		this.add(button);

		button.scene.anims.create({
			key: 'care',
			frames: button.anims.generateFrameNumbers('button_family', {
				start: 0,
				end: 1
			}),
			frameRate: 6,
			repeat: 0
		});

		button.scene.anims.create({
			key: 'uncare',
			frames: button.anims.generateFrameNumbers('button_family', {
				start: 1,
				end: 0
			}),
			frameRate: 6,
			repeat: 0
		});

		// dinero que se gasta
		let money = this.scene.add.bitmapText(553, 0, "generalFont", 0)
			.setTintFill('0xFFFFFF').setOrigin(1, 0.5).setFontSize(25).setCenterAlign();
		this.add(money);

		// línea para tacharlo en el caso de que esté muerto
		let line = this.scene.add.sprite(0, 0, 'white_line').setScale(0.8, 1).setVisible(false);
		this.add(line);

		// si el miembro está muerto no se puede cuidar y se tacha
		if(this.isDeath) {
			button.disableInteractive();
			line.setVisible(true);
			money.setText("R.I.P. " + this.info.date).setOrigin(0.5, 0.5).setFontSize(23);
			money.x -= 48;
		}

		button.on('pointerdown', () => {
			// máquina de estados
			if(!this.press) {
				// se comprueba si hay dinero suficente para cuidar a alguien
				if(!this.scene.checkMoney()) {
					button.play('care');
				}
			}
			else if(this.press) {
				button.play('uncare');
			}
		})

		button.on('animationcomplete', (anim) => {
        	if(anim.key === 'care') {
				this.care = true;
				this.press = true;
				money.setText(this.basicCares);
				this.scene.substractMoney();
        	}
        	else if(anim.key === 'uncare') {
        		// si estaba cuidado, como se deja de cuidar se añade el dinero que se había puesto
				if(this.care) {
					this.scene.recoverMoney();
				}
				this.care = false;
				this.press = false;
				money.setText(0);
        	}
    	});
	}

	death(dayNumber) {
		// si no estaba muerto se comprueba si debería morir
		if(!this.isDeath) {
			this.isDeath = !this.care;
			// se utiliza JSON.stringify para convertir el objeto con dos propiedades en un string
			localStorage.setItem(this.member, JSON.stringify({death: this.isDeath, date: (14 + dayNumber) + "-10-2022"}));
		}
	}
}