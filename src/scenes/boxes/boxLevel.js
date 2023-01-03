import Reset from '../../objects/buttons/reset_button.js';
import Character from "../../objects/box_levels/character.js";
import Moving_box from "../../objects/box_levels/box.js";

export default class BoxLevel1 extends Phaser.Scene {
    constructor(dayNumber) {
        super({key: 'boxLevel' + dayNumber});

        this.dayNumber = dayNumber;
    }

    create() {
        const CANVAS_WIDTH = this.game.config.width;
        const CANVAS_HEIGHT = this.game.config.height;

        // objeto tilemap
        // son datos que se han indicado a la hora de crear el tilemap
        this.map = this.make.tilemap({
            key: 'tilemap_nivel_' + this.dayNumber,
            tileWidth: 24,
            tileHeight: 33
        });

        // el primer parámetro es la propiedad name del tileset a usar y la segunda,
        // la imagen del tilemap
        const tileset = this.map.addTilesetImage('prueba', 'patrones_tilemap');

        // se crean las diferentes capas a partir del objeto tilemap
        // los nombres de las capas ('background' y 'walls') aparecen en el .json
        // hay 2 parámetros opcionales para indicar la posición
        this.background = this.map.createLayer('background', tileset);

        this.staticlayer = this.map.createLayer('walls', tileset);
        /*
        this.staticlayer.forEachTile(tile => {
            console.log(tile.index);
        });
        */
        // en las capas además de indicar con que otro gameObject colisionan
        // hay que indicar que tiles son las que colisionan
        // para ello se utiliza su id, en este caso el de las cajas pesadas
        // siempre se pone uno más del que aparece en Tiled
        this.staticlayer.setCollision(21);

        // boxes indica la capa de objetos de donde se van a sacar los objetos
        // Luego, para identificar los objetos que se van a crear de las capa de juego hay tres formas:
        // - name: se puede poner al objeto se quiera
        // - id: único de cadad objeto
        // - gid: lo comparten todos los objetos que utilizan la misma imagen
        // classType indica la clase base que se utiliza para crearlos
        // key indica el sprite inicial que se utiliza para crearlos porque inicialmente todos se crean como sprites
        // se devuelve un array con los objetos
        this.boxes = this.map.createFromObjects('boxes', {name: 'box', classType: Moving_box, key: 'm_box'});

        // map es un método de los arrays que permite iterar sobre todos sus elementos y modificarlos
        // se podría utilizar un foreach
        this.boxes.map((box) => {
            box.y += 33;
            box.setDepth(box.y);
            // se establece que las cajas no se salgan del mapa
            this.setBounds(box);
            // este objeto emite un evento cuando choca con los límites del mundo
            box.body.onWorldBounds = true;
        });

        this.physics.world.on('worldbounds', (entitie) => {
            if(this.boxes.includes(entitie.gameObject)) {
                this.events.emit("boxHasArrived", entitie.gameObject);
            }
        });

        // hacer que cuando las cajas choquen entre sí no se muevan
        this.physics.add.collider(this.boxes, this.boxes, (boxPushed, boxBis) => {
            this.events.emit("boxHasArrived", boxPushed);
            boxBis.body.setVelocity(0).setImmovable(true);
            boxBis.setDepth(boxBis.y);
        });

        // colisión entre las cajas y las cajas que se quedan quietas
        // como las cajas que se quedan quietas no tienen físicas al chocar con ellas no se moverán
        this.physics.add.collider(this.boxes, this.staticlayer, (box) => {
            this.events.emit("boxHasArrived", box);
        });

        // se crea el personaje y se le añade un collider para que no se pueda salir del mapa
        this.character = new Character(this, this.map.widthInPixels / 2, this.map.heightInPixels - 35);
        // se establece que el personaje no se salga del mapa
        this.setBounds(this.character);

        // colisión entre el personaje y las cajas que se quedan quietas
        this.physics.add.collider(this.character, this.staticlayer);

        this.speed = 30;
        let dir;
        // colisión entre las cajas y el personaje
        this.physics.add.collider(this.character, this.boxes, (character, box) => {

            box.body.setImmovable(false);
            if(box.body.touching.left) {
                box.body.setVelocityX(this.speed)
                dir = 'left';
            }
            else if(box.body.touching.right) {
                box.body.setVelocityX(-this.speed)
                dir = 'right';
            }
            else if(box.body.touching.up) {
                box.body.setVelocityY(this.speed)
                dir = 'up';
            }
            else if(box.body.touching.down) {
                box.body.setVelocityY(-this.speed)
                dir = 'down';
            }

            character.stop(dir);

            this.events.emit("boxMoved", dir);
        });

        // cuando una caja llega a su posición se hace inamovible,
        // de modo que si otra se choca con ella no se va a poder mover
        this.events.on("boxHasArrived", (box) => {
            box.body.setImmovable(true).setVelocity(0);
            box.setDepth(box.y);
            this.character.resume();
        });

        // botón de reset
        this.resetButton = new Reset(this, this.map.widthInPixels + 35, this.map.heightInPixels - 30);

        // baterías
        this.batteries = this.add.group();

        // overlap porque las baterías son triggers
        // si utilizáramos colliders cuando los dos objetos chocaran,
        // se alejarían levemente
        this.physics.add.overlap(this.character, this.batteries, (character, battery) => {
            if(battery.battPickedUp() === 0){
                this.endLevel();
            }
            // se elimina la batería del grupo
            // el segundo parámetro es para indicar si también se elimina de la escena, es decir, se destruye
            this.batteries.remove(battery, true);
        });

        // zoom a la cámara para que el tilemap para que se vea más grande
        // porque las layers normales se pueden reescalar y mover, pero
        // las de objetos no
        this.cameras.main.scrollX = - (CANVAS_WIDTH / 2 - this.map.widthInPixels / 2);
        this.cameras.main.scrollY = - (CANVAS_HEIGHT / 2 - this.map.heightInPixels / 2 - 8);
        this.cameras.main.setZoom(1.72).setBackgroundColor(0x343258);

        this.initLevel();
    }

    levelText() {
        this.text = this.add.bitmapText(this.map.widthInPixels / 2, this.map.heightInPixels / 2,
            'generalFont', 'PUZZLE ' + this.dayNumber, 0.5)
            .setOrigin(0.5, 0.5).setTintFill(0xffffff).setDropShadow(0.1).setDepth(999);

        this.appear = this.tweens.add({
            targets: this.text,
            scale: 50,
            duration: 1500,
            ease: 'Sine.easeOut',
            yoyo: true,
            repeat: 0,
        });

        this.appear.on('complete', () => {
            if(!this.ended) {
                this.text.setVisible(false);
                this.character.resume();
                this.resetButton.setInteractive();
            }
            else {
                this.scene.start('day' + (this.dayNumber + 1));
            }
        });
    }

    initLevel() {
        this.levelText();

        this.character.stop();
        this.resetButton.disableInteractive();
        this.ended = false;
    }

    endLevel() {
        this.character.stop();
        this.resetButton.disableInteractive();
        this.text.setScale(0.5).setText("PUZZLE ENDED").setVisible(true);
        this.ended = true;
        this.appear.play();
    }

    setBounds(entitie) {
        entitie.body
        // se cambia el tamaño de los límites del mundo
        .setBoundsRectangle(new Phaser.Geom.Rectangle(0, 33, this.map.widthInPixels, this.map.heightInPixels - 33))
        // la entidad choca con los límites del mundo, por lo tanto, no puede salir de ellos
        .setCollideWorldBounds(true);
    }
}