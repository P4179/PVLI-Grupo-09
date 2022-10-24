// Clase reloj
// Es un container que tiene como hijos un sprite del marco del reloj y un texto con la fecha actual

export default class Clock extends Phaser.GameObjects.Container {
	constructor (scene, x, y, date) {
		super(scene, x, y);
		this.scene.add.existing(this);

		// se crean los hijos y se añaden al propio container, es decir, al this
		let aspecto = scene.add.sprite(0, 0, 'clock');
		aspecto.setDisplaySize(100, 100);
		this.add(aspecto);

		let fecha = this.scene.add.text(0, 0, date, {fontFamily: 'Cambria'});
		fecha.setOrigin(0.5, 0.5);
		fecha.setColor('black');
		fecha.setSize('25px');
		this.add(fecha);
	}
}