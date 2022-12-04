/*
 * Clase que limita el espacio en el que se pueden arrastrar los documentos
 */
 export default class Space_Boundary extends Phaser.GameObjects.GameObject {

   constructor(scene, x, y, width) {
      super(scene, x, y);
  
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);  
      this.scene.physics.add.collider(this);
  
      // Cambiamos el tamaño del body para ocupar todo el ancho de la escena
      this.body.width = width;
      this.body.height = 10;
    }
  }