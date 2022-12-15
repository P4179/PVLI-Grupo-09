export default class BoxLevel1 extends Phaser.Scene {
	constructor() {
		super({key: 'boxLevel2'});
	}

	create() {
		this.scene.start('day3');
	}
}