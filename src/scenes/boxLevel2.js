import Reset from '../objects/reset_button.js';
import Character from '../objects/character.js';
import Box from '../objects/box.js';

export default class BoxLevel2 extends Phaser.Scene {
	constructor() {
		super({key: 'boxLevel2'});
	}

	create() {
        const CANVAS_WIDTH = this.game.config.width;
        const CANVAS_HEIGHT = this.game.config.height;

		this.map = this.make.tilemap({
            key: 'tilemap_nivel_2',
            tileWidth: 24,
            tileHeight: 33
        });

        const tileset = this.map.addTilesetImage('prueba', 'patrones_tilemap');

        this.background = this.map.createLayer('background', tileset);
        this.staticlayer = this.map.createLayer('walls', tileset);
        // this.staticlayer.setCollision(5);

        this.staticlayer.setCollisionByProperty({ colisiona: true });
        
        this.boxes = this.map.createFromObjects('boxes', {name: 'box', key: 'm_box'});
        this.boxes.map(b => b.y += 33);
        this.boxes.map(b => this.physics.add.existing(b));
        this.boxes.map(b => b.body.setSize(b.width * 0.9, b.height * 0.9));

        this.cameras.main.scrollX = -(CANVAS_WIDTH / 2 - this.map.widthInPixels / 2);
        this.cameras.main.scrollY = -(CANVAS_HEIGHT / 2 - this.map.heightInPixels  / 2);
        this.cameras.main.setZoom(1.60);

        this.character = new Character(this, this.map.widthInPixels / 2, this.map.heightInPixels - 10);

        this.physics.add.collider(this.boxes, this.boxes, (box1, box2) => {
            console.log(box1);
            console.log(box2);
            box1.body.setVelocity(0);
            box2.body.setVelocity(0);
        });
        this.physics.add.collider(this.boxes, this.staticlayer);
        this.physics.add.collider(this.character, this.staticlayer);
        this.physics.add.collider(this.character, this.boxes, (character, box) => {
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
        
        // this.box = new Box(this, 200, 200, 100);

        new Reset(this, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

        // this.box.on('hasReached', () => {
        //     this.character.enabledInput(true);
        // });

        this.physics.add.collider(this.character, this.box, (character, box) => {
            this.time.addEvent( {
                delay: 500, 
                callback: () => {
                    character.enabledInput(false);
                },
                callbackScope: this 
            });
            let side;
            if(box.body.touching.left || box.body.touching.up) {
                side = 'back';
            }
            // colisiona con la cara derecha y la inferior
            else{
                side = 'front';
            }
            this.events.emit('boxCharHasCollided', box.x, box.y, side);
        });
	}
}