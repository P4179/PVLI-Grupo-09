import Start from '../objects/start.js';

// Escena de Título

// default significa que se exporta la clase entera
// se puede exportar como default una sola clase por archivo
export default class Title extends Phaser.Scene {
	// identificador de la escena, se utiliza para cambiar de escena
	constructor() {
		super({ key: 'title' });
	}

	// Carga de los assets
	// En la escena del título solo cargaremos el fondo y luego,
	// el resto de assets se cargará en otra escena
	preload(){
		this.load.image('title_Screen', 'assets/sprites/title_Screen.jpeg');
	}

	// Creación de la escena
	// Se crean los objetos que va a haber en esta escena
	create() {
		// Añadimos la imagen de la pantalla del título a la escena
		var back = this.add.image(0, 0, 'title_Screen');
		// cambiar el centro de la textura, por defecto está situado en el medio
		back.setOrigin(0, 0);
		// this.sys.canvas. para acceder al canvas sin tener una variable que guarda su configuración
		back.setDisplaySize(this.sys.canvas.width, this.sys.canvas.height);

		// Se crea el texto start
		new Start(this, this.sys.canvas.width/2, this.sys.canvas.height/2 + 100);

		// se registra una función callback (NUNCA VA EN EL UPDATE)
		// son funciones que se ejecutan después de que se haya ejecutado otra función,
		// en este caso un evento, la pulsación de una tecla
		// arrow function (=>)
		// además de ser una manera simplificada de escribir una función convencional, 
		// se diferencian porque no tienen this propio, sino que se les asigna el del contexto superior
		this.input.keyboard.on('keydown', () => {
			// start es un método de un objeto scene
			// finaliza la escena actual y da paso a la siguiente
			this.scene.start('boot');
		});
	}
}