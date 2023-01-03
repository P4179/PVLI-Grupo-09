export default class Character extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'character');

		this.sprite = 'character';
		// velocidad de movimiento del jugador
		this.speed = 80;

		this.scene.add.existing(this);

		this.setScale(1.1);

		this.scene.physics.add.existing(this);
		this.body
			.setSize(this.width / 6, this.height / 5)
			.setOffset(23, this.height / 2 + 8);

		// Creamos las animaciones del personaje
		this.scene.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers(this.sprite, {
				start: 0,
				end: 3
			}),
			frameRate: 5,
			repeat: -1
		});

		// Creamos las animaciones de nuestra estatua
		this.scene.anims.create({
			key: 'walkDown',
			frames: this.anims.generateFrameNumbers(this.sprite, {
				start: 4,
				end: 11
			}),
			frameRate: 10,
			repeat: -1
		});

		// Creamos las animaciones de nuestra estatua
		this.scene.anims.create({
			key: 'walkUp',
			frames: this.anims.generateFrameNumbers(this.sprite, {
				start: 12,
				end: 19
			}),
			frameRate: 10,
			repeat: -1
		});

		// Creamos las animaciones de nuestra estatua
		this.scene.anims.create({
			key: 'walkLeft',
			frames: this.anims.generateFrameNumbers(this.sprite, {
				start: 20,
				end: 27
			}),
			frameRate: 10,
			repeat: -1
		});

		// Creamos las animaciones de nuestra estatua
		this.scene.anims.create({
			key: 'walkRight',
			frames: this.anims.generateFrameNumbers(this.sprite, {
				start: 28,
				end: 35
			}),
			frameRate: 10,
			repeat: -1
		});

		// la animación que se reproduce nada más comenzar es la 'idle'
		this.play('idle');

		// teclas para el movimiento del personaje
		this.wKey = this.scene.input.keyboard.addKey('W'); // arriba
		this.aKey = this.scene.input.keyboard.addKey('A'); // izquierda
		this.sKey = this.scene.input.keyboard.addKey('S'); // abajo
		this.dKey = this.scene.input.keyboard.addKey('D'); // derecha
	}

	stop(dir) {
		// se mueve levemente al jugador para evitar que colisione con una caja
		// que está en el borde más de una vez
		switch(dir) {
		case 'left':
			this.x -= 1;
			break;
		case 'right':
			this.x += 1;
			break;
		case 'up':
			this.y -= 1;
			break;
		case 'down':
			this.y += 1;
			break;
		}

		this.enabledInput(false);

		// se hace que el jugador no detecte ninguna tecla como pulsada ya que si había alguna pulsada,
		// al detener el input se sigue detectando como pulsada
		this.wKey.isDown = false;
		this.aKey.isDown = false;
        this.sKey.isDown = false;
        this.dKey.isDown = false;

		this.speed = 0;
	}

	resume() {
		this.enabledInput(true);

		this.speed = 80;
	}

	// se desactiva el input de las teclas del jugador
	enabledInput(enable) {
		this.wKey.enabled = enable;
        this.aKey.enabled = enable;
        this.sKey.enabled = enable;
        this.dKey.enabled = enable;
	}

	preUpdate(t, dt) {
		// importante llamar al preUpdate dle padre para que se ejecute la animación
		super.preUpdate(t, dt);

        // se cambia constantemente la profundidad del personaje para que
        // se situé delante de las cajas y detrás de ellas a la vez
        this.setDepth(this.y);

		// mientras se pulse la tecla A se mueve al personaje hacia la izquierda
		if(this.aKey.isDown){
			// si se está ejecutando ya la animación de moverse hacia la izquierda, no se vuelve a ejecutar
			if(this.anims.currentAnim.key !== 'walkLeft'){
				this.play('walkLeft');
			}
			this.body.setVelocityY(0);
			this.body.setVelocityX(-this.speed);
		}

		// mientras se pulse la tecla D se mueve al personaje hacia la derecha
		else if(this.dKey.isDown){
			if(this.anims.currentAnim.key !== 'walkRight'){
				this.play('walkRight');
			}
			this.body.setVelocityY(0);
			this.body.setVelocityX(this.speed);
		}

		// mientras se pulse la tecla W se mueve al personaje hacia arriba
		else if(this.wKey.isDown){
			if(this.anims.currentAnim.key !== 'walkUp'){
				this.play('walkUp');
			}
			this.body.setVelocityX(0);
			this.body.setVelocityY(-this.speed);
		}

		else if(this.sKey.isDown){
			if(this.anims.currentAnim.key !== 'walkDown'){
				this.play('walkDown');
			}
			this.body.setVelocityX(0);
			this.body.setVelocityY(this.speed);
		}

		else{
			if(this.anims.currentAnim.key !== 'idle'){
				this.play('idle');
			}
			this.body.setVelocityX(0);
			this.body.setVelocityY(0);
		}
	}
}