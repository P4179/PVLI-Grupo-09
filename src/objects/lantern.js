export default class Lantern extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, sprite, duration, angle) {
		super(scene, x, y, sprite);

		this.scene.add.existing(this);

		this.setOrigin(0,0).setScale(1.3);
		this.scene.tweens.timeline({
			targets: this,
			loop: -1,
			tweens: [
			{
				angle: -angle,
            	ease: 'Sine.easeOutCubic',
            	duration: duration,
            	yoyo: true
        	},
        	{
            	angle: angle,
            	ease: 'Sine.easeOutCubic',
            	duration: duration,
            	yoyo: true
        	}
        	]
		});

		this.setScale(1.3);
	}
}