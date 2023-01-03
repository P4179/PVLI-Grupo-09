export default class Reset extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'reset', 1);

		this.scene.add.existing(this);

		this.tweenFinished = false;
		this.animationFinished = false;

		this.setOrigin(0.5, 0.5).setScale(0.7);

		this.scene.anims.create({
            key: 'press_reset',
            frames: this.anims.generateFrameNames('reset', {start:1, end:2}),
            // velocidad de los fotogramas
            frameRate: 5,
            repeat: 0   // no se repite la animación
        });

        let tween = this.scene.tweens.add({
            targets: this,
            scale: 1.2,
            angle: -360,
            duration: 800,
            ease: 'Sine.easeIn',
            repeat: 0,
            paused: true
        });

        this.setInteractive();

        this.buttonPressed = false;

        this.on('pointerdown', () => {
        	this.buttonPressed = true;
            this.play('press_reset');
            tween.play();
        });

        this.on("pointerover", () => {
        	if(!this.buttonPressed){
        		this.setFrame(0);
        	}
        });

        this.on("pointerout", () => {
        	if(!this.buttonPressed){
        		this.setFrame(1);
        	}
        });

        tween.on('complete', () => {
        	this.tweenFinished = true;
        });

        this.on('animationcomplete', () => {
        	this.animationFinished = true;
        });
	}

	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		if(this.tweenFinished && this.animationFinished) {
			// se accede al scene manager a partir de la escena, por eso hay dos .scene
			this.scene.scene.start(this.scene.key);
		}
	}
}