
export default class initialScene extends Phaser.Scene{

constructor(){
    super({ key: 'initialScene' });
}

   create ()
    {
        console.log(this.cache.text.get('text1'));
    }

    update ()
    {

    }



}