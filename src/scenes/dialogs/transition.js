import DialogScene from './dialogScene.js';

export default class Transition extends DialogScene {
    constructor() {
        super('transition');
    }

    init(data) {
        this.dayNumber = data.info;
    }

    create() {
        const CANVAS_WIDTH = this.game.config.width;
        const CANVAS_HEIGHT = this.game.config.height;

        let info = {
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT / 2,
            size: 30,
            wrapWidth: CANVAS_WIDTH - 300,
            color: 0xFFFFFF,
            nextScene: 'boxLevel' + this.dayNumber
        }

        switch(this.dayNumber) {
        case 1:
            info.text = "Before work, you go to the warehouse to get the batteries to make the SHOOT button works.\nMove the boxes to reach the batteries.";
            break;
        case 2:
            info.text = "Before work, you go to the warehouse to get the battery to make the XRAY works.\nMove the boxes to reach the battery.";
            break;
        }

        super.create(info);

        this.dialog_manager.setCenterAlign().setOrigin(0.5);
    }
}