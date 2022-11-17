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
		this.aspecto = scene.add.sprite(0, 0, sprite);
		this.aspecto.setScale(2);
		this.add(this.aspecto);

		this.setSize(this.aspecto.width * this.aspecto.scale, this.aspecto.height * this.aspecto.scale);
		this.setInteractive();
		this.scene.input.setDraggable(this);
		this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {

			gameObject.x = dragX;
			gameObject.y = dragY;
	
		});
	}

	getAspecto() {
    	return this.aspecto;
  	}

	destroyMe(){
		this.destroy();
	}
}