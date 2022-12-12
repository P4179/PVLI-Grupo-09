// Clase reloj
// Es un container que tiene como hijos un sprite del marco del reloj y un texto con la fecha actual

import Date from "../auxs/date.js";

export default class Clock extends Phaser.GameObjects.Container {
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
		let aspecto = this.scene.add.sprite(0, 0, 'clock');
		aspecto.setScale(0.07);
		// se añade como hijo al container
		this.add(aspecto);


		let fecha = new Date(scene, 0, 0, date.d, date.m, date.y);
		fecha.setFontSize(20);
        fecha.setTint(0xDC7633);
		this.add(fecha);

		// cambiar la escala del container, de modo que cambia el tamaño de todos sus hijos
		// si no se pone el parámetro de la y se toma que es el mismo que el de la x
	}
}