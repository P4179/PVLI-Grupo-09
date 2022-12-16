export default class Moving_box extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, tileSize) {
		super(scene, x, y, 'box');
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);

		this.tileSize = tileSize;

		this.scene.events.on('boxCharHasCollided', (posX, posY, side) => {
			this.posBfCol = { x: posX, y: posY };
			this.side = side;
		});
	}

	preUpdate() {
		if(this.side === 'back') {
			if(this.x > this.posBfCol.x + this.tileSize || this.y > this.posBfCol.y + this.tileSize) {
				this.body.setVelocity(0, 0);
				this.emit('hasReached');
			}
		}
		else if(this.side === 'front'){
			if(this.x < this.posBfCol.x - this.tileSize || this.y < this.posBfCol.y - this.tileSize) {
				this.body.setVelocity(0, 0);
				this.emit('hasReached');
			}
		}
	}
}