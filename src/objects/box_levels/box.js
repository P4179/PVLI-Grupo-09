export default class Moving_box extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'm_box');

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);

        // inicialmento todas las cajas son inamovibles
        this.body.setImmovable(true);

        this.offset = {x:24, y:33};

        this.scene.events.on("boxMoved", (dir) => {
        	this.dir = dir;

        	switch(this.dir) {
			case 'left':
				this.newPosX = this.x + this.offset.x;
				break;
			case 'right':
				this.newPosX = this.x - this.offset.x;
				break;
			case 'up':
				this.newPosY = this.y + this.offset.y;
				break;
			case 'down':
				this.newPosY = this.y - this.offset.y;
				break;
			}
        });
	}

	preUpdate() {
		switch(this.dir) {
		case 'left':
			if(this.x > this.newPosX) {
				this.scene.events.emit("boxHasArrived", this);
				this.dir = null;
			}
			break;
		case 'right':
			if(this.x < this.newPosX) {
				this.scene.events.emit("boxHasArrived", this);
				this.dir = null;
			}
			break;
		case 'up':
			if(this.y > this.newPosY) {
				this.scene.events.emit("boxHasArrived", this);
				this.dir = null;
			}
			break;
		case 'down':
			if(this.y < this.newPosY) {
				this.scene.events.emit("boxHasArrived", this);
				this.dir = null;
			}
			break;
		}
	}
}