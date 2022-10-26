// Escena para la precarga de assets que se utilizarán en el juego, es decir, los sprites

export default class Boot extends Phaser.Scene {
  // Constructor
  constructor() {
    super({ key: 'boot' });
  }

  // Carga de los assets del juego
  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    this.load.setPath('assets/sprites/');
    // Estatuas
    this.load.image('man1', 'retrato_hombre_1.png');
    this.load.image('man1_Fake', 'retrato_hombre_1_FAKE.png');
    this.load.image('man2', 'retrato_hombre_2.png');
    this.load.image('man2_Fake', 'retrato_hombre_2_FAKE.png');
    this.load.image('man3', 'hombre_3.png');
    this.load.image('man3_Fake', 'hombre_3_FAKE.png');
    this.load.image('man4', 'hombre_4.png');
    this.load.image('man4_FAKE', 'hombre_4_FAKE.png');
    // Reloj
    this.load.image('clock', 'digital-clock.png');
    this.load.image('auth_cert', 'AccessPermitInner.jpg');
    //Botones
    this.load.image('yes_button', 'boton_verde_SpriteSheet.png');
    this.load.image('no_button', 'boton_rojo_SpriteSheet.png');
  }

  // Creación de la escena
  // En este caso, solo se pasa a la escena del primer nivel
  create() {
    this.scene.start('level1');
  }
}