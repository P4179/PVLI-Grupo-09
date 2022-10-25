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
    this.load.image('man1_Fake', 'retrato_hombre_1_Fake.png');
    this.load.image('man2', 'retrato_hombre_2.png');
    this.load.image('man2_Fake', 'retrato_hombre_2_Fake.png');
    // Reloj
    this.load.image('clock', 'digital-clock.png');
    this.load.image('auth_cert', 'AccessPermitInner.jpg');
  }

  // Creación de la escena
  // En este caso, solo se pasa a la escena del primer nivel
  create() {
    this.scene.start('level1');
  }
}