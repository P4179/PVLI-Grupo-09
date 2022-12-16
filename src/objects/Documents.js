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
		this.upper_limit = 195;
		this.interactiveGroup = this.scene.add.group();

		this.layer = this.scene.add.layer();
		this.comparatorMode = false;

		// se crean los hijos y se añaden al propio container, es decir, al this
		this.aspecto = scene.add.sprite(0, 0, sprite);
		this.add(this.aspecto);

		//se da tamaño al documento debido a que es un container y no tiene
		this.setSize(this.aspecto.width, this.aspecto.height);
		//una vez el documento tiene tamaño, se añade a las físicas. Si se añade antes, no tendrá collider
		this.scene.physics.add.existing(this);

		const config = {
	        mute: false,
	        volume: 0.1,
	        rate: 1,
	        detune: 0,
	        seek: 0,
	        loop: false,
	        delay: 0,
	    }; 

	    let paperSound = this.scene.sound.add("documentsS", config);

		//sonido
		this.on('pointerdown', ()=>{paperSound.play()});	

		this.setTam(h);
		
		this.setInteractive();
		this.scene.input.setDraggable(this);
		this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
			this.scene.getStatue().resetDocumentDepths();
			if(gameObject.depth != 3){
				gameObject.setDepth(3);
			}
			//escalado de los documentos cuando se arrastran
			gameObject.setScale((gameObject.y / h) ** 2);
			gameObject.setDepth(10);
			//si el documento se va a salir de la pantalla no se deja ser arrastrado
			if ((dragY + ((gameObject.height * gameObject.scale) / 2)) < this.scene.sys.canvas.height &&
				(dragY > (gameObject.upper_limit + (gameObject.height * gameObject.scale / 2))))
				gameObject.y = dragY;

			if ((dragX + ((gameObject.width * gameObject.scale) / 2)) < this.scene.sys.canvas.width &&
				((dragX - ((gameObject.width * gameObject.scale) / 2)) > 0))
				gameObject.x = dragX;
		});
	}

	setTam(h) {
		//se cambia la escala despues de añadirla a las físicas para que cambie también el body
		this.setScale((this.y / h) ** 2);
	}

	comparatorSwitch(state) {
		this.comparatorMode = state;
		this.interactiveGroup.children.each(function (t) {
			// console.log(t);
			if (state)
				t.setInteractive();
			else
				t.disableInteractive();
		}, this);

	}

	destroyMe() {
		this.destroy();
	}

	makeChildsInteractive() {
		this.interactiveGroup.children.each(function (t) {
			t.on('pointerdown', () => {
				console.log(t);
				this.scene.getStatue().setCompVar(t);
			});
		}, this);
	}
}