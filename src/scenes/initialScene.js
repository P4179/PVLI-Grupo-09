
export default class initialScene extends Phaser.Scene{

constructor(){
    super({ key: 'initialScene' });
}

    preload(){
        this.load.plugin('LoreInitText', './dialogs_plugin.js'); //Carga el plugin para esta escena
    }

   create ()
    {
        this.sys.install('LoreInitText');
        console.log(this.sys.dialogModal);
        this.sys.dialogModal.init(); //Inicia el constructor de parametros (como no se especifica ninguno, cogemos los por defecto)
        this.sys.dialogModal.setText('Testing this. Lorem ipsum, lorem ipsem. elapsam semel occassionem non ipse potest Iuppiter reprehendere.');
        //this.scene.start('level1');
    }

}