import Documents from './documents.js'

export default class Manual extends Phaser.GameObjects.Sprite{	
	/**
	 * manual constructor
	 * @param {Scene} scene - the GO's scene
	 * @param {number} x - coordinate x
	 * @param {number} y - coordinate y
	 * @param {number} cBegin - comienzo fecha de creación de estatuas (-246)
	 * @param {number} cEnd - fin fecha de creación de estatuas (-216)
	 * @param {boolean} open - determina si el manual está abierto o cerrado
	 * @param {day} - indica el día en el que se encuentra para decidir que se muestra
	 */

	constructor(scene, x, y, day){
		super(scene, x, y,"close_manual");
		this.scene.add.existing(this);
		this._open = false;
		this._cBegin = -246;
		this._cEnd = -216;
		this.setScale(0.59);
		this.day = day;

		this._depth = 1;

        this.setInteractive();

        // textos
		let textFecha;
		let normas;
		let colorText;
		let soundText;
		let stampText;
		let xrayText;

		// imagenes
		let colors;
		let stamps;
		let xrayItems;

		const config = {
	        mute: false,
	        volume: 1,
	        rate: 1,
	        detune: 0,
	        seek: 0,
	        loop: false,
	        delay: 0,
	    }; 

	    this.manualSound = this.scene.sound.add("manualA", config);

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

		this.scene.anims.create({
			key: 'open',
			frames: scene.anims.generateFrameNumbers('open_manualF', {start:0, end:1}),
			frameRate: 5,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'close',
			frames: scene.anims.generateFrameNumbers('close_manualF', {start:0, end:1}),
			frameRate: 5,
			repeat: 0
		});

		this.on('pointerdown', () => {
	        if(this._open){
	            this.play('m_close');
	            this._open = false;
	            this.setScale(0.6);
	            textFecha.destroy();
	            normas.destroy();   
	            if(this.day === 2){
	            	colorText.destroy();
	            	soundText.destroy();
	            	colors.destroy();
	            }
	            else if(this.day === 3){
	            	stampText.destroy();
	            	xrayText.destroy();
					stamps.destroy();
	            	xrayItems.destroy();
	            }
	            this.setSizeToFrame('open_manual(close)');
	            this.manualSound.play();
	        }
	        else{
	            this.play('m_open');
	            this._open = true;
	            this.setScale(1);
	            this.manualSound.play();
	        }
    	});

    	this.on('animationcomplete', end => {
    		if(this.anims.currentAnim.key === 'm_open'){
    			this.play('open');
    			this.setScale(5);
    			if(this.day === 1){
    				normas = this.scene.add.text(this.x - 170, this.y - 60, 'Check List\n - Photo  \n - Expiration day \n - Creation date', {fontFamily: 'Ink Free'}).setOrigin(0.5, 0.5);
    			}
    			else if(this.day === 2){
    				normas = this.scene.add.text(this.x - 160, this.y - 35, 'Check List\n - Photo  \n - Expiration day \n - Creation date \n - Name \n - Terracotta color \n - Sound', {fontFamily: 'Ink Free'}).setOrigin(0.5, 0.5);
    				colorText = this.scene.add.text(this.x + 120, this.y - 95, 'Correct terracotta colors', {fontFamily: 'Ink Free'}).setOrigin(0.5, 0.5);
    				colorText._depth = 1;
    				soundText = this.scene.add.text(this.x + 130, this.y + 70, 'The high sound is the correct', {fontFamily: 'Ink Free'}).setOrigin(0.5, 0.5);
    				soundText._depth = 1;
    				colors = this.scene.add.image(this.x + 120, this.y - 30, 'colores');
    				colors.setScale(0.8);
    				colors._depth = 1;
    			}
    			else {
    				normas = this.scene.add.text(this.x - 170, this.y - 25, 'Check List\n - Photo  \n - Expiration day \n - Creation date \n - Name \n - Serial number \n - Stamp \n - XRAY', {fontFamily: 'Ink Free'}).setOrigin(0.5, 0.5);
    				stampText = this.scene.add.text(this.x + 120, this.y - 95, 'Valid stamps', {fontFamily: 'Ink Free'}).setOrigin(0.5, 0.5);
					stampText._depth = 1;
					xrayText = this.scene.add.text(this.x + 125, this.y - 5, 'Not valid items', {fontFamily: 'Ink Free'}).setOrigin(0.5, 0.5);
					xrayText._depth = 1;
					stamps = this.scene.add.image(this.x + 120, this.y - 50, 'validStamps');
    				stamps.setScale(0.9);
    				stamps._depth = 1;
					xrayItems = this.scene.add.image(this.x + 120, this.y + 60, 'xrayItems');
    				xrayItems.setScale(0.9);
    				xrayItems._depth = 1;
    			}
    			normas._depth = 1;
				textFecha = this.scene.add.text(this.x - 150, this.y + 80, 'Creation date interval:\n -246 --> -216', {fontFamily: 'Ink Free'}).setOrigin(0.5, 0.5);
	            
	            textFecha._depth = 1;
    		}	
    		else if(this.anims.currentAnim.key === 'm_close'){
    			this.play('close')
    		}
		})

	}

	destroyMe(){
		this.destroy();
	}
}

