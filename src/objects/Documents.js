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
		let h = 300;
		this.setScale((this.y / h) ** 2)

		// se crean los hijos y se añaden al propio container, es decir, al this
		this.aspecto = scene.add.sprite(0, 0, sprite);
		this.add(this.aspecto);

		this.setSize(this.aspecto.width * this.aspecto.scale, this.aspecto.height * this.aspecto.scale);
		this.setInteractive();
		this.scene.input.setDraggable(this);
-		this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
			gameObject.setScale((gameObject.y / h) ** 2);
			
			if((dragX + ((gameObject.width * gameObject.scale) / 2)) < this.scene.sys.canvas.width &&
			(dragX - ((gameObject.width * gameObject.scale) / 2)) > 0)
				gameObject.x = dragX;
			if((dragY + ((gameObject.height * gameObject.scale) / 2)) < this.scene.sys.canvas.height) 
				gameObject.y = dragY;
		});
	}
	/*
	getAspecto() {
    	return this.aspecto;
  	}
	*/
	destroyMe(){
		this.destroy();
	}
}