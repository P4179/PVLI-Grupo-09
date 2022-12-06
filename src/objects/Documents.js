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
		this.scene.physics.add.existing(this);
		let h = 300;
		this.setScale((this.y / h) ** 2)

		// se crean los hijos y se añaden al propio container, es decir, al this
		this.aspecto = scene.add.sprite(0, 0, sprite);
		this.add(this.aspecto);

		this.setSize(this.aspecto.width * this.aspecto.scale, this.aspecto.height * this.aspecto.scale);
		this.body.setSize(this.aspecto.width * this.aspecto.scale, this.aspecto.height * this.aspecto.scale);
		this.setInteractive();
		this.scene.input.setDraggable(this); -
		this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
			//escalado de los documentos cuando se arrastran
			gameObject.setScale((gameObject.y / h) ** 2);

			//si el documento se va a salir de la pantalla no se deja ser arrastrado
			if ((dragY + ((gameObject.height * gameObject.scale) / 2)) < this.scene.sys.canvas.height &&
				(dragY + ((gameObject.height * gameObject.scale) / 2)) > 280)
				gameObject.y = dragY;
			if ((dragX + ((gameObject.width * gameObject.scale) / 2)) < this.scene.sys.canvas.width &&
				((dragX - ((gameObject.width * gameObject.scale) / 2)) > 0))
				gameObject.x = dragX;
		});

		// //se añade colision con los boundaries
		// this.bounds = this.scene.getHUD().getBoundaries();
		// this.scene.physics.add.collider(this, this.bounds); // Colision de documentos con bondaries
	}
	/*
	getAspecto() {
    	return this.aspecto;
  	}
	*/
	destroyMe() {
		this.destroy();
	}
}