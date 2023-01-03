// Clase calendario

export default class Calendar extends Phaser.GameObjects.Container {
	/*
	* Constructor de Calendar
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

        // después de cierto tiempo se reproduce la animación de calendar
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

        	// se emite un evento para que el texto que indica el nuevo día también aparezca
        	this.emit('calendarStarted');
        })

        // en el último frame de la animación del calendario, aparece el texto con el nuevo día
        calendar.on('animationupdate', () => {
        	if(calendar.anims.currentFrame.index === 7) {
        		day.setText(date.d);
        		day.setVisible(true);
   				month.setVisible(true);
        		year.setVisible(true);

        		// se emite un evento para que el texto con el nuevo día desaparezca
        		this.emit('calendarFinished');
        	}
        })
	}
}