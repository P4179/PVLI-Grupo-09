// Clase botón tanto para el botón SÍ como para el botón NO

export default class Bg_Button extends Phaser.GameObjects.Sprite {
    /**
     * Constructor de Estatua, estatua de terracota
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     * @param {boolean} type - determina si se trata del botón de SÍ o NO
     */
    constructor(scene, x, y, type){
        // se asigna el sprite dependiendo del botón
        let sprite;
        if(type){
            sprite = 'button_yes';
        }
        else{
            sprite = 'button_no'
        }

        super(scene, x, y, sprite);
        this.scene.add.existing(this);

        this.type = type;

        // se necesitan dos create diferentes porque sino habría dos animaciones con el mismo identificador 
        // y el gestor de animaciones no sería capaz de procesarlo
        this.scene.anims.create({
            key: 'clickYes', 
            frames: this.anims.generateFrameNames('button_yes', {start:1, end:0}),
            // velocidad de los fotogramas
            frameRate: 5,
            repeat: 0  // no se repite la animación
        });

        this.scene.anims.create({
            key: 'clickNo', 
            frames: this.anims.generateFrameNames('button_no', {start:1, end:0}),
            // velocidad de los fotogramas
            frameRate: 5,
            repeat: 0  // no se repite la animación
        });

        this.setInteractive();

        this.on('pointerdown', () => {
            if(this.type){
                this.play('clickYes');
            }
            else{
                this.play('clickNo');
            }
            this.scene.nextStatue(this.type);
        });
    }
}