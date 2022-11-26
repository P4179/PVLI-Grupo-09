/**
 * Clase que limita el espacio en el que se pueden arrastrar los documentos
 */
 export default class Floor extends Phaser.GameObjects.Sprite {

    constructor(scene, y, group) {
      super(scene, 0, scene.sys.game.canvas.height-y);
  
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
      group.add(this);
  
      this.scene.physics.add.collider(this);
  
      // Cambiamos el tamaño del body para ocupar todo el ancho de la escena
      this.body.width = scene.sys.game.canvas.width + 100;
      this.body.height = 10;
    }
  }