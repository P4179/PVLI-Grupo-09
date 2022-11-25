import Documents from './documents.js'

export default class Manual extends Documents{	
	/**
	 * manual constructor
	 * @param {Scene} scene - the GO's scene
	 * @param {number} x - coordinate x
	 * @param {number} y - coordinate y
	 * @param {number} cBegin - comienzo fecha de creación de estatuas (-246)
	 * @param {number} cEnd - fin fecha de creación de estatuas (-216)
	 * @param {boolean} sello - determina el sello valido
	 * @param {boolean} open - determina si el manual está abierto o cerrado
	 */

	constructor(scene, x, y, sello){
		super(scene, x, y, "close_manual");
		this.scene.add.existing(this);
		this._sello = sello;
		this._open = false;
		this._cBegin = -246;
		this._cEnd = -216;
		this.setScale(0.3);

		this.scene.anims.create({
			key: 'm_close',
			frames: scene.anims.generateFrameNumbers('open_manual(close)', {start:0, end:2}),
			frameRate: 5,
			repeat: 0
		});

		this.scene.anims.create({
			key: 'm_open',
			frames: scene.anims.generateFrameNumbers('close_manual(open)', {start:0, end:2}),
			frameRate: 5,
			repeat: 0
		});

		this.on('pointerdown', () => {
	        if(this._open){
	            super.getAspecto().play('m_close');
	            this._open = false;
	            this.setScale(0.3);
	        }
	        else{
	            super.getAspecto().play('m_open');
	            this._open = true;
	            this.setScale(0.5);
	        }
    	});
	}

	destroyMe(){
		this.destroy();
	}
}

