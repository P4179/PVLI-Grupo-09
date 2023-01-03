import DialogScene from './dialogScene.js';

export default class Victory extends DialogScene {
    constructor() {
        super('victory');
    }

    create() {
        const CANVAS_WIDTH = this.game.config.width;
        const CANVAS_HEIGHT = this.game.config.height;

        this.add.bitmapText(CANVAS_WIDTH / 2, 85, 'dialogsFont', "Congratulations", 80)
            .setTintFill(0x29761D).setOrigin(0.5).setDropShadow(4, 3, 0xFFFFFF);

        let info = {
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT / 2,
            size: 28,
            wrapWidth: CANVAS_WIDTH - 200,
            color: 0xFFFFFF,
            nextScene: 'title'
        }

        let wife = JSON.parse(localStorage.getItem('Wife'));
        let son = JSON.parse(localStorage.getItem('Son'));
        let daughter = JSON.parse(localStorage.getItem('Daughter'));
        let dog = JSON.parse(localStorage.getItem('Dog'));

        info.text = "Your work as an statues checker has finished.\n";
        if(!wife.death && !son.death && !daughter.death && !dog.death) {
            info.text += "You have earned enough money to make all ur family stay alive!!!";
        }
        else {
           info.text += "In spite of your efforts to support your family, they not all have survived.\n"
            if(wife.death) {
                info.text += "\nWife R.I.P. " + wife.date;
            }
            if(son.death) {
                info.text += "\nSon R.I.P. " + son.date;
            }
            if(daughter.death) {
                info.text += "\nDaughter R.I.P. " + daughter.date;
            }
            if(dog.death) {
                info.text += "\nDog R.I.P. " + dog.date;
            }
        }

        super.create(info);

        this.events.emit('notWrappedText');

        this.dialog_manager.setCenterAlign().setOrigin(0.5).setFont('dialogsFont');
    }
}