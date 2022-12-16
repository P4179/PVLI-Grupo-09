export default class Battery extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, num){
        super(scene, x, y, 'batt')
        this.setOrigin(0);

        Battery.needed = num;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    battPickedUp(){
        console.log(Battery.needed - 1);
        Battery.needed--;
        return Battery.needed;
    }
}