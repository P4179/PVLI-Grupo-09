import DialogText from '../dialogs_plugin.js';

export default class initialScene extends Phaser.Scene{

constructor(){
    super({key: 'initialScene', active: true, visible: true});

        // atributos
        this.dialogText = new DialogText(this);
        this.hasCreatedWindow = false;
        this.isToggled = true;
        this.testText = "Testing this. Lorem ipsum, lorem ipsum. Elapsam semel occassionem non ipse potest Iuppiter reprehendere.";
    }

   create ()
    {
        
        this.createWindow();
        this.setText();
        this.toggleWindow();
    
        //this.scene.start('level1');
    }

    update(){}   

    createWindow() {
        this.dialogText.init();
        this.hasCreatedWindow = true;
    }

    setText() {
        this.dialogText.setText(this.testText, true);
    }

    toggleWindow() {
        this.dialogText.toggleWindow();
        this.isToggled = !this.isToggled;
    }

    

}