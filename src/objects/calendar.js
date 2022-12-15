// Clase calendario
// Es un container que tiene como hijos un sprite del marco del reloj y un texto con la fecha actual

export default class Calendar extends Phaser.GameObjects.Container {
	/*
	* Constructor de Start
	* @param {Phaser.Scene} scene Escena a la que pertenece Clock
	* @param {number} x Coordenada X
	* @param {number} y Coordenada Y
	* @param {number} date.d es el día, date.m es el mes, date.y es el año
	*/
	constructor (scene, x, y, date) {
		// tiene un cuarto parámetro opcional que sirve para añadir hijos
		// luego, se pueden añadir más
		super(scene, x, y);
		this.scene.add.existing(this);

		// se crean los hijos y se añaden al propio container, es decir, al this
		// se crea el sprite del reloj
		let calendar = this.scene.add.sprite(0, 0, 'calendar');
		calendar.setScale(0.3);
		calendar.scene.anims.create({
            key: 'newDay',
            frames: calendar.anims.generateFrameNames('calendar', {start:0, end:7}),
            // velocidad de los fotogramas
            frameRate: 6,
            repeat: 0
        })
		calendar.setScale(0.3);
		// se añade como hijo al container
		this.add(calendar);

		let day = this.scene.add.text(0, -30, date.d - 1, { fontFamily: 'Ink Free'}).setStyle({fontSize: 26, color: 0xFFFFFF}).setOrigin(0.5, 0.5);
		this.add(day);
		let month = this.scene.add.text(0, 0, date.m, { fontFamily: 'Ink Free'}).setStyle({fontSize: 20, color: 0xFFFFFF}).setOrigin(0.5, 0.5);
		this.add(month);
		let year = this.scene.add.text(0, 30, date.y, { fontFamily: 'Ink Free'}).setStyle({fontSize: 26, color: 0xFFFFFF}).setOrigin(0.5, 0.5);
		this.add(year);

		let newDayText = this.scene.add.bitmapText(this.scene.game.config.width / 2, this.scene.game.config.height / 2,
		 'documentFont', "DAY " + this.scene.dayNumber, 5).setOrigin(0.5, 0.5).setTintFill(0xffffff).setDropShadow(1);
		newDayText.setVisible(false);
		let appear = this.scene.tweens.add({
            targets: newDayText,
            scale: 8,
            duration: 1000,
            ease: 'Cubic.easeIn',
            repeat: 0,
            paused: true,
        })
        let disappear = this.scene.tweens.add({
            targets: newDayText,
            scale: 0,
            duration: 1000,
            ease: 'Circ.easeOut',
            repeat: 0,
            delay: 1000,
            paused: true,
        })

		this.scene.time.addEvent( {
     		delay: 1500, 
        	callback: () => {
        		calendar.play('newDay');
        		
        	},
        	callbackScope: this.scene
        });

        calendar.on('animationstart', () => {
        	day.setVisible(false);
        	month.setVisible(false);
        	year.setVisible(false);

        	newDayText.setVisible(true);
        	appear.play();
        })

        calendar.on('animationupdate', () => {
        	if(calendar.anims.currentFrame.index === 7) {
        		day.setText(date.d);
        		day.setVisible(true);
   				month.setVisible(true);
        		year.setVisible(true);
        		disappear.play();
        	}
        })

        disappear.on('start', () => {
        	this.emit('startDay');
        })

        disappear.on('complete', () => {
        	newDayText.destroy();
        });
	}
}