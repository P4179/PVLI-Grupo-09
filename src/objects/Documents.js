export default class Documents extends Phaser.GameObjects.Container {
	/**
	 * Documents constructor
	 * @param {Scene} scene - the GO's scene
	 * @param {number} x - coordinate x
	 * @param {number} y - coordinate y
	 */
	constructor(scene, x, y, sprite) {
		super(scene, x, y);
		this.scene.add.existing(this); 

		// se crean los hijos y se añaden al propio container, es decir, al this
		let aspecto = scene.add.sprite(0, 0, sprite);
		aspecto.setScale(2);
		this.add(aspecto);

		this.setSize(aspecto.width * aspecto.scale, aspecto.height * aspecto.scale);
		this.setInteractive();
		this.scene.input.setDraggable(this);
		this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {

			gameObject.x = dragX;
			gameObject.y = dragY;
	
		});

	}

	destroyMe(){
		this.destroy();
	}
}