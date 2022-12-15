import Lantern from './lantern.js';

export default class Background extends Phaser.GameObjects.Container {
	constructor(scene) {
		super(scene, 0, 0);

		this.scene.add.existing(this);

		const CANVAS_WIDTH = this.scene.game.config.width;
		const CANVAS_HEIGHT = this.scene.game.config.height;

		this.topBg = [];

		// fondo
		// importante el orden el que se crean las cosas
		// fondo
		let bg = {
			sprite: this.scene.add.image(0, 0,'background').setOrigin(0, 0).setDisplaySize(CANVAS_WIDTH, CANVAS_HEIGHT),
			startColor: '0xFCDDD9',
			endColor: '0x473E3D'
		}
		this.topBg.push(bg);

		// elementos del parallax
		// se añaden a un array para después poder gestionarlos todos a la vez fácilmente
		// montañas 1
		this.parallax = []
		let mountains1 = {
			sprite: this.scene.add.tileSprite(0, -34, CANVAS_WIDTH, 
				this.scene.textures.get('mountains1').getSourceImage().height, 'mountains1').setOrigin(0, 0),
			speed: 0.07,
			startColor: '0xF7CDC6',
			endColor: '0x4C3F3D'
		}
		this.parallax.push(mountains1);
		this.topBg.push(mountains1);

		// montañas 2
		let mountains2 = {
			sprite: this.scene.add.tileSprite(0, -30, CANVAS_WIDTH, 
				this.scene.textures.get('mountains2').getSourceImage().height, 'mountains2').setOrigin(0, 0),
			speed: 0.06,
			startColor: '0xEFBFCE',
			endColor: '0x524046'
		}
		this.parallax.push(mountains2);
		this.topBg.push(mountains2);

		// árboles
		let trees = {
			sprite: this.scene.add.tileSprite(0, -22, CANVAS_WIDTH, 
				this.scene.textures.get('trees').getSourceImage().height, 'trees').setOrigin(0, 0),
			speed: 0.1,
			startColor: '0xA29971',
			endColor: '0x2F2D22'
		}
		this.parallax.push(trees);
		this.topBg.push(trees);

		let templo = {
			sprite: this.scene.add.image(0, 0, 'templo').setOrigin(0, 0).setDisplaySize(CANVAS_WIDTH, CANVAS_HEIGHT),
			startColor: '0xF8CCB5',
			endColor: '0x574941'
		}
		this.topBg.push(templo);

		const offset = -20;
		let lantern1 = {
			sprite: new Lantern(this.scene, 90, offset + 4, 'lantern2', 1375, 11),
			startColor: '0xFFDD5C',
			endColor: '0x7E6D2D'
		}
		this.topBg.push(lantern1);
		let lantern2 = {
			sprite: new Lantern(this.scene, 170, offset - 32, 'lantern1', 1856, 15),
			startColor: '0xFFDD5C',
			endColor: '0x7E6D2D'
		}
		this.topBg.push(lantern2);
		let lantern3 = {
			sprite: new Lantern(this.scene, CANVAS_WIDTH - 120, offset, 'lantern2', 1013, 5),
			startColor: '0xFFDD5C',
			endColor: '0x7E6D2D'
		}
		this.topBg.push(lantern3);
		let lantern4 = {
			sprite: new Lantern(this.scene, CANVAS_WIDTH - 210, offset - 37, 'lantern1', 1139, 12),
			startColor: '0xFFDD5C',
			endColor: '0x7E6D2D'
		}
		this.topBg.push(lantern4);

		this.topBg.forEach((item) => {
			this.add(item.sprite);
			this.dayNight(item.sprite, item.startColor, item.endColor);
		});

		this.add(this.scene.add.image(0, 0, 'mesa').setOrigin(0, 0).setDisplaySize(CANVAS_WIDTH, CANVAS_HEIGHT));

	}

	preUpdate(t, dt) {
		this.parallax.forEach(item => {
			item.sprite.tilePositionX += item.speed;
		});
	}

	dayNight(sprite, startColor, endColor) {
		let sColor = Phaser.Display.Color.HexStringToColor(startColor);
		let eColor = Phaser.Display.Color.HexStringToColor(endColor);

		let length = 100;
		// tween con contador
		// se inicia cuando se llama a la función porque no se ha seteado paused a false
		let dayNight = this.scene.tweens.addCounter({
			from: 0,
			to: length,
            targets: sprite,
            duration: this.scene.timer,
            ease: 'Sine.easeIn',
            repeat: 0,
        })

        dayNight.on('update', () => {
        	// valor actual del tween, es decir, desde 0 hasta length que valor ha tomado
        	let value = dayNight.getValue();
        	// función que interpola entre dos colores y devuelve un color entre ellos
        	// length corresponde con el rango de colores entre el color inicial y el final
        	// value corresponde con el índice con el que empieza en la interpolación
        	// es por eso que el tween tiene un contador ya que sino empezaría siempre desde el principio y nunca avanzaría
        	let colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(sColor, eColor, length, value);

        	// se convierte el color obtenido con la interpolación en rgb
        	let color = Phaser.Display.Color.GetColor(colorObject.r, colorObject.g, colorObject.b);
        	sprite.setTint(color);
        });
	}
}