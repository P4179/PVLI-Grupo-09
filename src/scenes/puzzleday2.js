export default class Puzzleday2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'puzzleday2'
        });
    }
    create() {
        this.map = this.make.tilemap({
            key: 'tilemap_nivel_2',
            tileWidth: 24,
            tileHeight: 33
        });

        const tileset = this.map.addTilesetImage('prueba', 'patrones_tilemap_nivel_2');

        this.background = this.map.createLayer('background', tileset);
        this.staticlayer = this.map.createLayer('walls', tileset);

        this.staticlayer.setCollisionByProperty({ colisiona: true });
        
        this.boxes = this.map.createFromObjects('boxes', {name: 'box', key: 'm_box'});
        this.boxes.map(b => b.y += 33);
        this.boxes.map(b => this.physics.add.existing(b));
        this.boxes.map(b => b.body.setImmovable(true));

        this.cameras.main.scrollX = -(this.game.config.width / 2 - this.map.widthInPixels / 2);
        this.cameras.main.scrollY = -(this.game.config.height / 2 - this.map.heightInPixels  / 2);

        // this.boxlayer.setCollisionByProperty({colli: true});
        // this.physics.add.collider(this.player, this.boxlayer);
    }

}