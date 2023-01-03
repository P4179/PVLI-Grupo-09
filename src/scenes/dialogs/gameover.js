import DialogScene from './dialogScene.js';

export default class GameOver extends DialogScene {
    constructor() {
        super('gameover');
    }

    init(data) {
        this.type = data.info;
    }

    create() {
        const CANVAS_WIDTH = this.game.config.width;
        const CANVAS_HEIGHT = this.game.config.height;

        this.add.bitmapText(CANVAS_WIDTH / 2, 85, 'dialogsFont', "GameOver", 80)
            .setTintFill(0xB02A2A).setOrigin(0.5).setDropShadow(4, 3, 0xFFFFFF);

        let info = {
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT / 2,
            size: 28,
            wrapWidth: CANVAS_WIDTH - 200,
            color: 0xFFFFFF,
            nextScene: 'title'
        }

        switch(this.type) {
        case 'familyDeath':
            info.text = "You haven't been able to support your family.\nThey have all died.";
            break;
        case 'maxFails':
            info.text = "You have committed many fails and u have been fired.\nYou must find another work to support your FAMILY.";
            break;
        }

        super.create(info);

        this.dialog_manager.setCenterAlign().setOrigin(0.5).setFont('dialogsFont')
    }
}