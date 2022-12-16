export default class extends Phaser.GameObjects.Sprite {
	constructor(scene) {
		super(scene, 0, 0, 'bola_tenis');

        this.scene.add.existing(this);

        // se crea inicialmente y se va haciendo visible o invisble dependiendo de las necesidades
        // se ajusta su profundidad para que se muestre encime de las estatuas
        this.setDepth(8).setVisible(false);

        this.speed = 2500; 
        this.fallenSpeed = -800;         

        // físicas de la bola 
        this.scene.physics.add.existing(this);
        this.body.setSize(this.body.width - 10, this.body.height - 10);

        this.scene.anims.create({
            key: 'shoot',
            frames: this.anims.generateFrameNumbers('bola_tenis', {start: 0, end: 15}),
            frameRate: 6,
            repeat: -1
        });
        this.play('shoot');
	}

	preUpdate(t, dt) {
		super.preUpdate(t, dt);
        // cuando la bola se sale de la pantalla se puede volver a pulsar el botón Shoot y se para la pelota
        if(this.y < 0) {
        	this.emit('ballDisappeared');
            this.y = 0;
            this.body.setVelocityY(0);
            this.setVisible(false);
        }
    }

    moving() {
    	this.x = -50;
        this.y = 80;
        this.body.setVelocityX(this.speed);
        this.setVisible(true);
    }

    hasCollided() {
        this.body.setVelocityX(0).setVelocityY(this.fallenSpeed);
    }
}