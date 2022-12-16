//código de typewrite sacado de https://blog.ourcade.co/posts/2020/phaser-3-typewriter-text-effect-bitmap/

export default class InitialScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'initialScene'
        });
    }

    create() {
        let news = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'daily_news').setScale(2.5);
        news.setOrigin(0.5);
        this.label = this.add.bitmapText(25, (this.game.config.height / 2) - 130, 'newsFont', '')
        .setMaxWidth(this.game.config.width - 100).setTintFill(0x605F58).setFontSize(30);

        this.newsText = "In today's daily news, we've been informed that our fellow comrades previously kidnapped by the opium-loving b*itish have managed to escape their evil grasps. That's not all though, we've also noticed some impostors trying to get into our great nation! And so, we need you, the smartest, bravest, handsomest, poorest of all to assist us in the protection of this country. Apply today at your nearest Qin Shi Huang office. We promise we won't exploit you THAT much!!!!!";
        this.totallength = this.newsText.length;
        this.typewriteText(this.newsText)
        
        this.finish = false;

        this.input.keyboard.on('keydown', () => {
			// start es un método de un objeto scene
			// finaliza la escena actual y da paso a la siguiente
            if(this.finish)
			    this.scene.start('day1');
		});

		this.input.on('pointerdown', () =>
		{
            if(this.finish)
			    this.scene.start('day1');
		});
    }

    //se escribe una letra cada 0.2s
    typewriteText(text) {
        this.label.setText(text)

        const bounds = this.label.getTextBounds(false)
        const wrappedText = bounds['wrappedText'] || text
    
        this.label.setText('')

        const length = wrappedText.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                this.label.text += wrappedText[i];
                ++i;
                if(i >= this.totallength){
                    this.continue_text = this.add.text(this.game.config.width / 2, this.game.config.height - 30, "Press any key to continue", 25)
                    .setOrigin(0.5);
                    this.finish = true;
                }
            },
            repeat: length - 1,
            delay: 25
        })
    }
}