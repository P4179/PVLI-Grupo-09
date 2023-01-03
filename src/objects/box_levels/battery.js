export default class Battery extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, num){
        super(scene, x, y, 'batt')
        this.setOrigin(0).setScale(1.1);

        // variable estática, pertenece a la clase y no a la instancia
        // por lo tanto, cuando disminuye, disminuye para todas las instancias de la clase
        Battery.needed = num;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    battPickedUp(){
        --Battery.needed;
        return Battery.needed;
    }
}