export default class BoxLevel1 extends Phaser.Scene {
	constructor() {
		super({key: 'boxLevel1'});
	}

	create() {
		this.scene.start('day2');
	}
}