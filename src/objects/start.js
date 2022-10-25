// Clase que represta al texto de inicio que se muestra en la pantalla de título

export default class Start extends Phaser.GameObjects.Text {
	/*
	* Constructor de Start
	* @param {Phaser.Scene} scene Escena a la que pertenece Start
	* @param {number} x Coordenada X
	* @param {number} y Coordenada Y
	* @param {string} Texto
	*/
	constructor(scene, x, y) {
		super(scene, x, y, "Press any key to start", {fontFamily: 'ink_free'});
		// añadir el objeto a la escena actual
		this.scene.add.existing(this);
		// cambiar el estilo de la fuente
		this.setStyle({
			fontSize: '30px',
			color: 'black'
		});
		// se situa el centro de la textura en el medio
		this.setOrigin(0.5, 0.5);

		this.elapsed_Time = 0;
		// cada cuánto tiempo parpadea
		this.flash = 1000;
	}

	// cada cierto tiempo el texto parpadea,
	// lo que se traduce en que se hace invisible y luego, visible y así todo el rato
	// la clase Text no tiene preUpdate, no se puede llamar al del padre
	preUpdate(t, dt) {
		this.elapsed_Time += dt;
		if(this.elapsed_Time > this.flash){
			this.elapsed_Time = 0;
			this.visible = !this.visible;
		}
	}
}