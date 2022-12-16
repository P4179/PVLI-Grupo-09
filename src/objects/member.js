export default class Continue extends Phaser.GameObjects.Container {
	constructor (scene, x, y, member) {
		super(scene, x, y);

		this.scene.add.existing(this);

		this.care = false;
		this.press = false;
		this.member = member;
		// se convierte en booleano porque lo que se guarda localmente es texto
		this.isDeath = localStorage.getItem(this.member) === 'true';

		// se hace que el texto sea interactivo, de modo que al pulsarlo se produzca un evento
		let continueText = this.scene.add.bitmapText(0, 0, "documentFont", this.member)
			.setTintFill('0xFFFFFF').setOrigin(0.5, 0.5).setFontSize(25);
		this.add(continueText);
		
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

		let money = this.scene.add.bitmapText(553, 0, "documentFont", 0)
			.setTintFill('0xFFFFFF').setOrigin(1, 0.5).setFontSize(25);
		this.add(money);

		let line = this.scene.add.sprite(0, 0, 'white_line').setScale(0.8, 1).setVisible(false);
		this.add(line);

		if(this.isDeath) {
			button.disableInteractive();
			line.setVisible(true);
			money.setText("");
		}

		button.on('pointerdown', () => {
			if(!this.press) {
				// se comprueba si hay dinero suficente para cuidar a alguien
				if(!this.scene.checkMoney()) {
					this.care = true;
					this.press = true;
					button.play('care');
					money.setText(100);
					this.scene.substractMoney();
				}
			}
			else if(this.press) {
				if(this.care) {
					this.scene.recoverMoney();
				}
				this.care = false;
				this.press = false;
				button.play('uncare');
				money.setText(0);
			}
		})
	}

	death() {
		this.isDeath = !this.care;
		localStorage.setItem(this.member, this.isDeath);
	}
}