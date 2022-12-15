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
		super(scene, x, y, 'close_manual');
		this.scene.add.existing(this);
		this._open = false;
		this._cBegin = -246;
		this._cEnd = -216;
		this.setScale(0.59);
		this.day = day;

		this._depth = 1;

        this.setInteractive();

        // textos
        this.textFecha = this.scene.add.text(this.x - 150, this.y + 80, 'Creation date interval:\n -246 --> -216', {fontFamily: 'Ink Free'}).setOrigin(0.5, 0.5).setVisible(false).setDepth(1);
		this.normas1 = this.scene.add.text(this.x - 170, this.y - 60, 'Check List\n - Photo  \n - Expiration day \n - Creation date', {fontFamily: 'Ink Free'}).setOrigin(0.5, 0.5).setVisible(false).setDepth(1);
		this.normas2 = this.scene.add.text(this.x - 160, this.y - 35, 'Check List\n - Photo  \n - Expiration day \n - Creation date \n - Name \n - Terracotta color \n - Sound', {fontFamily: 'Ink Free'}).setOrigin(0.5, 0.5).setVisible(false).setDepth(1);
		this.normas3 = this.scene.add.text(this.x - 170, this.y - 25, 'Check List\n - Photo  \n - Expiration day \n - Creation date \n - Name \n - Serial number \n - Stamp \n - XRAY', {fontFamily: 'Ink Free'}).setOrigin(0.5, 0.5).setVisible(false).setDepth(1);
		this.colorText = this.scene.add.text(this.x + 120, this.y - 95, 'Correct terracotta colors', {fontFamily: 'Ink Free'}).setOrigin(0.5, 0.5).setVisible(false).setDepth(1);
		this.soundText = this.scene.add.text(this.x + 130, this.y + 70, 'The high sound is the correct', {fontFamily: 'Ink Free'}).setOrigin(0.5, 0.5).setVisible(false).setDepth(1);
		this.stampText = this.scene.add.text(this.x + 120, this.y - 95, 'Valid stamps', {fontFamily: 'Ink Free'}).setOrigin(0.5, 0.5).setVisible(false).setDepth(1);
		this.xrayText = this.scene.add.text(this.x + 125, this.y - 5, 'Not valid items', {fontFamily: 'Ink Free'}).setOrigin(0.5, 0.5).setVisible(false).setDepth(1);

		// imagenes
		this.colors = this.scene.add.sprite(this.x + 120, this.y - 30, 'colores').setScale(0.8).setVisible(false).setDepth(1);
		this.stamps = this.scene.add.sprite(this.x + 120, this.y - 50, 'validStamps').setScale(0.9).setVisible(false).setDepth(1);
		this.xrayItems = this.scene.add.sprite(this.x + 120, this.y + 60, 'xrayItems').setScale(0.9).setVisible(false).setDepth(1);

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
	            this.textFecha.setVisible(false);
	            if(this.day === 1){
	            	this.normas1.setVisible(false);
	            }
	            else if(this.day === 2){
	            	this.normas2.setVisible(false);
	            	this.colorText.setVisible(false);
	            	this.soundText.setVisible(false);
	            	this.colors.setVisible(false);
	            }
	            else if(this.day === 3){
	            	this.normas3.setVisible(false);
	            	this.stampText.setVisible(false);
	            	this.xrayText.setVisible(false);
					this.stamps.setVisible(false);
	            	this.xrayItems.setVisible(false);
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
					this.normas1.setVisible(true);    			
				}
    			else if(this.day === 2){
					this.normas2.setVisible(true);       				
					this.colorText.setVisible(true);  
					this.soundText.setVisible(true);
					this.colors.setVisible(true);
    			}
    			else {
					this.normas3.setVisible(true);  
					this.stampText.setVisible(true);  		
					this.xrayText.setVisible(true);		
					this.stamps.setVisible(true);
					this.xrayItems.setVisible(true);
    			}
				this.textFecha.setVisible(true);     
    		}	
    		else if(this.anims.currentAnim.key === 'm_close'){
    			this.play('close')
    		}
		})

	}
}

