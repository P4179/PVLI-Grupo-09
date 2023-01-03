import DialogScene from './dialogScene.js';

export default class InitialScene extends DialogScene {
    constructor() {
        super('initialScene');
    }

    create() {
        const CANVAS_WIDTH = this.game.config.width;
        const CANVAS_HEIGHT = this.game.config.height;

        let info = {
            text: "In today's daily news, we've been informed that our fellow comrades previously kidnapped by the opium-loving b*itish have managed to escape their evil grasps. That's not all though, we've also noticed some impostors trying to get into our great nation! And so, we need you, the smartest, bravest, handsomest, poorest of all to assist us in the protection of this country. Apply today at your nearest Qin Shi Huang office. We promise we won't exploit you THAT much!!!!!",
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