import Dialog_manager from '../../auxs/dialog_manager.js';

export default class DialogScene extends Phaser.Scene {
	constructor (sceneKey) {
		super({
			key: sceneKey
		});
	}

	create(info) {
        // se activa por precaución
        // al cometer los fallos se pulsa el botón de no y el input estaba desactivado
        this.input.mouse.manager.enabled = true;
        
        const CANVAS_WIDTH = this.game.config.width;
        const CANVAS_HEIGHT = this.game.config.height;

		this.dialog_manager = new Dialog_manager(this, info);

        this.dialog_manager.on('textHasAppeared', () => {
            this.continue_text = this.add.text(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 48, "Press any key to continue",
                {fontFamily: 'Calibri', fontSize: 17}).setOrigin(0.5).setTintFill(info.color);

            this.input.keyboard.on('keydown', () => {
                this.scene.start(info.nextScene);
            });

            this.input.on('pointerdown', () =>
            {
                this.scene.start(info.nextScene);
            });
        });
	}
}