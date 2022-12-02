
export default class HUD extends Phaser.GameObjects.Container {
	// Constructor de la escena
	constructor(scene){
		super(scene, 0, 0);

		this.setOrigin(0, 0);

		const CANVAS_WIDTH = this.sys.canvas.width;
		const CANVAS_HEIGHT = this.sys.canvas.height;

		// fondo
		// todos los sprites se añaden después del fondo porque sino quedan debajo
		this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(CANVAS_WIDTH, CANVAS_HEIGHT);

		new Buttons_Yes_No(this.scene, CANVAS_WIDTH - 100, 380, true);
		new Buttons_Yes_No(this.scene, CANVAS_WIDTH - 100, 530, false);

		// se instancia el reloj
		// se pasa la fecha como un solo objeto con tres parámetros
		new Clock(this.scene, 90, CANVAS_HEIGHT - 70, {d: 15, m: 10, y: 2022});

		// instancia de Fails
		this.fails = new Fails(this.scene, CANVAS_WIDTH - 10, 10);
	}
}