import DialogScene from './dialogScene.js';

export default class InitialScene extends DialogScene {
    constructor() {
        super('initialScene');
    }

    create() {
        const CANVAS_WIDTH = this.game.config.width;
        const CANVAS_HEIGHT = this.game.config.height;

        let info = {
            text: "Statues from the terracota army who were kidnapped by opium-loving british people and were exposed in the British Museum have managed to escape from their evil grasps. That's not all though, we've also noticed some impostors trying to get into our great nation! And so, we need you, the smartest, bravest, handsomest, poorest of all to assist us to return the real ones to the emperor tomb. Apply today at your nearest Qin Shi Huang office. We promise we won't exploit you THAT much!!!!!",
            x: 50,
            y: CANVAS_HEIGHT / 2 - 130,
            size: 30,
            wrapWidth: CANVAS_WIDTH - 100,
            color: 0x605F58,
            nextScene: 'day1'
        }

        this.add.image(0, 0, 'daily_news').setOrigin(0).setDisplaySize(CANVAS_WIDTH, CANVAS_HEIGHT);

        super.create(info);
    }
}