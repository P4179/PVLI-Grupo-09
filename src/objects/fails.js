// clase Fails: se ocupa de los fallos que comete el jugador en un nivel

export default class Fails extends Phaser.GameObjects.BitmapText { 
	// constructor de la clase Fails
	constructor(scene, x, y){ 
		super(scene, x, y, 'documentFont');
		this.scene.add.existing(this);

		this.setOrigin(1, 0).setFontSize(25).setTintFill(0xFFFFFF);

		this.fails = 0; // fallos iniciales del jugador
		this.actFails();

		this.tween = this.scene.tweens.add({
            targets: this,
            scale: 1.5,
            duration: 500,
            ease: 'Sine.easeOut',
            yoyo: true,
            repeat: 0,
            paused: true
        });

        // la diferencia entre play y active es que hay un delay y no hasta que se produce el callback, respectivamente
        this.tween.on('active', () => {
        	console.log("hola");
        	this.setTintFill(0xE52121);
        })

        this.tween.on('complete', () => {
        	console.log("adios");
        	this.setTintFill(0xffffff);
        })
	}

	// devuelve los fallos del jugador
	getFails(){ 
		return this.fails;
	}

	// se añade un fallo al jugador
	addFail(){ 
		this.tween.play();
		++this.fails;
		this.actFails();
	}

	// actualzia el texto con los fallos del jugador
	actFails(){
		this.setText("Fails: " + this.fails);
	}
}