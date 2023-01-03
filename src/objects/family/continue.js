export default class Continue extends Phaser.GameObjects.Container {
	constructor (scene, x, y) {
		super(scene, x, y);

		this.scene.add.existing(this);

		// se hace que el texto sea interactivo, de modo que al pulsarlo se produzca un evento
		let continueText = this.scene.add.bitmapText(0, 0, "generalFont", "Continue")
			.setTintFill('0xFFFFFF').setOrigin(0.5, 0.5).setFontSize(25);

		this.add(continueText);
		
		let border = this.scene.add.sprite(0, 0, 'button_family').setScale(0.7, 0.2).setInteractive();
		this.add(border);

		// se produce este evento justo cuando se toca la imagen
		border.on('pointerdown', () => {
			this.emit('buttonPressed');
		});

        border.on("pointerover", () => {
        	this.setScale(1.2);
        });

        border.on("pointerout", () => {
        	this.setScale(1);
        });

        this.setScale(0.8);
	}
}