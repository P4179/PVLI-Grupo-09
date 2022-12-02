// Escena para la precarga de assets que se utilizarán en el juego, es decir, los sprites

export default class Boot extends Phaser.Scene {
  // Constructor
  constructor() {
    super({ key: 'boot' });
  }

  // Carga de los assets del juego
  preload() {
    //carga del bitmap usado para los documentos
    this.load.bitmapFont('documentFont', 'assets/fonts/BMYbitmap/BMYbitmap.png', 'assets/fonts/BMYbitmap/BMYbitmap.xml');
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    this.load.setPath('assets/sprites/');
    // Estatuas
    this.load.image('man1', 'retrato_hombre_1_peque.png');
    this.load.image('man1_Fake', 'retrato_hombre_1_FAKE.png');
    this.load.image('man2', 'retrato_hombre_2_peque.png');
    this.load.image('man2_Fake', 'retrato_hombre_2_FAKE.png');
    this.load.image('man3', 'Hombre_3.PNG');
    this.load.image('man3_Fake', 'Hombre_3_FAKE.PNG');
    this.load.image('man4', 'Hombre_4.PNG');
    this.load.image('man4_Fake', 'Hombre_4_FAKE.PNG');
    this.load.image('woman1', 'retrato_mujer_1.png');
    // Reloj
    this.load.image('clock', 'digital-clock.png');
    //Certificado de autenticidad
    this.load.image('auth_cert', 'AccessPermitInner.png');
    //Papel del autor
    this.load.image('auth_paper', 'IdSupplementInner.png');
    // Fondo de los niveles
    this.load.image('background', 'fondo_2.png');
    // Botones
    this.load.spritesheet('button_yes', 'Boton_verde_Spritesheet.png', {frameWidth: 150, frameHeight: 147});
    this.load.spritesheet('button_no', 'Boton_rojo_SpriteSheet.png', {frameWidth: 150, frameHeight: 147});
    this.load.spritesheet('button_xray', 'Boton_azul_SpriteSheet.png', {frameWidth: 150, frameHeight: 147});
	  // Spritesheets de estatuas
    this.load.spritesheet('idle_man_1', 'animacion_retrato_hombre_1_spritesheet.png', {frameWidth: 420, frameHeight: 420});
    this.load.spritesheet('idle_man_2', 'animacion_retrato_hombre_2_spritesheet.png', {frameWidth: 420, frameHeight: 420});
    this.load.spritesheet('idle_woman_1', 'animacion_retrato_mujer_1_spritesheet.png', {frameWidth: 420, frameHeight: 420});
    this.load.spritesheet('idle_man_2', 'animacion_retrato_hombre_5_spritesheet.png', {frameWidth: 420, frameHeight: 420});

    //Manual
    this.load.image('close_manual', 'close_manual.png');
    this.load.image('open_manual', 'open_manual.png');
    this.load.spritesheet('close_manual(open)', 'close_manual(open).png', {frameWidth: 496, frameHeight: 248});
    this.load.spritesheet('open_manual(close)', 'open_manual(close).png', {frameWidth: 496, frameHeight: 248});
  }
  // Creación de la escena
  // En este caso, solo se pasa a la escena del primer nivel
  create() {
    this.scene.start('level1');
  }
}