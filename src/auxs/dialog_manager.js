// Clase que se encarga de hacer que el texto vaya apareciendo de poco a poco
// código de typewrite sacado de https://blog.ourcade.co/posts/2020/phaser-3-typewriter-text-effect-bitmap/

export default class Dialog_manager extends Phaser.GameObjects.BitmapText {
	constructor(scene, info) {
		// se crea el texto vacío
		// lo que se hace en realidad es crear un cuadro de texto donde
		// posteriormente irá apareciendo el texto letra a letra
		super(scene, info.x, info.y, 'newsFont', '');

		this.scene.add.existing(this);

		this.setMaxWidth(info.wrapWidth)	// se establece el ancho del cuadro de texto
        	.setTintFill(info.color)
        	.setFontSize(info.size);

        this.typewriteBitmapText(info.text);    	
	}

	typewriteBitmapText(text) {
        this.setText(text);

        // se obtiene bounds del cuadro de texto con todo el texto
        // porque nos interesa la propiedad wrappedText
        // esta propiedad contiene la cadena con los saltos de líneas apropiedados
        // de modo que al escribiendo letra a letra no se quedará corto por saltarse los saltos de línea
        const bounds = this.getTextBounds(false);
        // se utiliza or por si la propiedad wrappedText no existe
        // se accede a la propiedad como clave []
        const wrappedText = bounds['wrappedText'] || text;

        // se pone el cuadro de texto vacío
        this.setText('')

        let length = wrappedText.length

        let displayText = wrappedText;

        // se utiliza en la escena de victoria para que el texto no se ajuste perfectamente al cuadro de texto
        // ya que sino se parte por la mitad donde no interesa
        this.scene.events.on("notWrappedText", () => {
            displayText = text;
            length = text.length;
        })

        // se escribe letra a letra
        let i = 0
        this.scene.time.addEvent({
            callback: () => {
                this.text += displayText[i];
                ++i;
                // cuando se termina de escribir todas las letras se emite un evento
                if(i >= length) {
                    this.emit("textHasAppeared");
                }
            },
            repeat: length - 1,
            delay: 70
        })
    }
}