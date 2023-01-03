import Button from './button.js'
import Ball from '../ball.js';

export default class Button_Shoot extends Button {
    constructor(scene, x, y){
        super(scene, x, y, 'button_xray', "SHOOT");


        this.scene.add.existing(this);

        this.text = "SHOOT";

        this.textButton.setFontSize(25);
        this.setScale(0.5);

        this.ball = new Ball(this.scene);

        // se produce este evento cuando se ha pulsado el botón
        this.on(this.text, () => {
            // animaciones del botón
            this.aspecto.play('click' + this.text);
            this.moveText.play();

            this.shootBall();   
        });

        this.ball.on('ballDisappeared', () => {
            this.aspecto.setInteractive();
        });
    }

    shootBall() {
        // cuando se dispara la bola se desactiva el botón Shoot
        // y hasta que no se haya salido de la pantalla no vuelve a aparecer
        this.aspecto.disableInteractive()
        this.ball.moving();
    }
}