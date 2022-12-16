import Reset from '../objects/reset_button.js';
import Character from "../objects/character.js";
import Battery from "../objects/battery.js";

export default class BoxLevel1 extends Phaser.Scene {
	constructor() {
		super({key: 'boxLevel1'});
	}

	create() {
        const CANVAS_WIDTH = this.game.config.width;
        const CANVAS_HEIGHT = this.game.config.height;

		this.map = this.make.tilemap({
            key: 'tilemap_nivel_1',
            tileWidth: 24,
            tileHeight: 33
        });

        const tileset = this.map.addTilesetImage('prueba', 'patrones_tilemap');

        this.background = this.map.createLayer('background', tileset);
        this.staticlayer = this.map.createLayer('walls', tileset);

        this.staticlayer.setCollisionByProperty({ colisiona: true });
        
        this.boxes = this.map.createFromObjects('boxes', {name: 'box', key: 'm_box'});
        this.boxes.map(b => b.y += 33);
        this.boxes.map(b => this.physics.add.existing(b));
        this.boxes.map(b => b.body.setSize(b.width * 0.9, b.height * 0.9));
        this.boxes.map(b => b.body.setCollideWorldBounds());
        this.boxes.map(b => b.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0, 33, this.map.widthInPixels, this.map.heightInPixels - 33)));

        this.cameras.main.scrollX = -(CANVAS_WIDTH / 2 - this.map.widthInPixels / 2);
        this.cameras.main.scrollY = -(CANVAS_HEIGHT / 2 - this.map.heightInPixels  / 2);
        this.cameras.main.setZoom(1.60);

        this.character = new Character(this, this.map.widthInPixels / 2, this.map.heightInPixels - 10);
        
        this.character.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0, 33, this.map.widthInPixels, this.map.heightInPixels - 33));

        this.physics.add.collider(this.boxes, this.boxes, (box1, box2) => {
            box1.body.setVelocity(0);
            box2.body.setVelocity(0);
            box1.body.setImmovable();
            box2.body.setImmovable();
        });

        this.physics.add.collider(this.boxes, this.staticlayer);
        this.physics.add.collider(this.character, this.staticlayer);
        this.physics.add.collider(this.character, this.boxes, (character, box) => {
            box.body.setImmovable(false);
            if(box.body.touching.left) {
                box.body.setVelocityX(+20)
            }
            else if(box.body.touching.right) {
                box.body.setVelocityX(-20)
            }
            if(box.body.touching.up) {
                box.body.setVelocityY(+20)
            }
            if(box.body.touching.down) {
                box.body.setVelocityY(-20)
            }

        });

        new Reset(this, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

        this.battery1 = new Battery(this, 24, 66, 2);
        this.battery2 = new Battery(this, 288, 99, 2);
        this.physics.add.collider(this.character, this.battery1, (c, b)=>{
            b.setVisible(false);
            if(b.battPickedUp() === 0){
                this.scene.start('day3');
            }
            b.destroy();
        });
        this.physics.add.collider(this.character, this.battery2, (c, b)=>{
            b.setVisible(false);
            if(b.battPickedUp() === 0){
                this.scene.start('day2');
            }
            b.destroy();
        });
	}
}