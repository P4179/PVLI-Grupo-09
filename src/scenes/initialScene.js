import DialogText from '../dialogs_plugin.js';

export default class initialScene extends Phaser.Scene{

constructor(){
    super({key: 'InitialScene', active: true, visible: true});
        this.dialogText = new DialogText(this);
        this.hasCreatedWindow = false;
        this.isToggled = true;
}

    preload(){
        const TEXT = 'Testing this. Lorem ipsum, lorem ipsum. Elapsam semel occassionem non ipse potest Iuppiter reprehendere.';
    }

   create ()
    {
        
        this.createWindow();
        this.setText();
        this.togglwWindow();
    
        //this.scene.start('level1');
    }

    update(){}
        

    createWindow() {
        this.dialogText.init();
        this.hasCreatedWindow = true;
    }

    setText() {
        this.dialogText.setText(TEXT, true);
    }

    toggleWindow() {
        this.dialogText.toggleWindow();
        this.isToggled = !this.isToggled;
    }

    

}