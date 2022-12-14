// Escena para la precarga de assets que se utilizarán en el juego, es decir, los sprites

export default class Boot extends Phaser.Scene {
  // Constructor
  constructor() {
    super({ key: 'boot' });
  }

  // Carga de los assets del juego
  preload() {
    // NIVELES
    this.load.setPath('assets/levels');
    this.load.text('day1', 'day1.json');
    this.load.text('day2', 'day2.json');
    this.load.text('day3', 'day3.json');

    // TEXTO BITMAP
    this.load.setPath('assets/fonts');
    // Texto para los documentos
    this.load.bitmapFont('documentFont', 'BMYbitmap/BMYbitmap.png', 'BMYbitmap/BMYbitmap.xml');
    
    // SPRITES
    // Fondo de los niveles
    this.load.setPath('assets/sprites/fondos');
    this.load.image('background', 'fondo_2.png');

    // Estatuas
    this.load.setPath('assets/sprites/estatuas');
    // Spritesheets de las estatuas
    this.load.spritesheet('manGreen', 'animacion_retrato_hombre_5_spritesheet.png', {frameWidth: 420, frameHeight: 420});
    this.load.spritesheet('man1', 'animacion_retrato_hombre_1_spritesheet.png', {frameWidth: 420, frameHeight: 420});
    this.load.spritesheet('man2', 'animacion_retrato_hombre_2_spritesheet.png', {frameWidth: 420, frameHeight: 420});
    this.load.spritesheet('woman1', 'animacion_retrato_mujer_1_spritesheet.png', {frameWidth: 420, frameHeight: 420});
    // Estatuas falsas
    this.load.image('man1_Fake', 'retrato_hombre_1_FAKE.png');
    this.load.image('man2_Fake', 'retrato_hombre_2_FAKE.png');
    this.load.image('man3_Fake', 'Hombre_3_FAKE.PNG');
    this.load.image('man4_Fake', 'Hombre_4_FAKE.PNG');

    // Documentos
    this.load.setPath('assets/sprites/documentos');
    this.load.image('auth_cert', 'AccessPermitInner.png');  // certificado de autenticidad
    this.load.image('auth_paper', 'IdSupplementInner.png'); // tarjeta de identidad
    this.load.image('mat_reg', 'MaterialRecord.png'); // carnet de materiales

    // Otros
    this.load.setPath('assets/sprites/otros');
    // Reloj
    this.load.image('clock', 'digital-clock.png');
    // Sellos de museos
    this.load.spritesheet('stamp_sprites', 'Stamps.png', {frameWidth: 42, frameHeight: 42})
    // Explosivo
    this.load.image('explosive', 'Explosivo.png');
    // Vacío
    this.load.image('empty', 'vacio.png');

    // Botones
    this.load.setPath('assets/sprites/botones');
    this.load.spritesheet('button_yes', 'Boton_verde_Spritesheet.png', {frameWidth: 150, frameHeight: 147});
    this.load.spritesheet('button_no', 'Boton_rojo_SpriteSheet.png', {frameWidth: 150, frameHeight: 147});
    this.load.spritesheet('button_xray', 'Boton_azul_SpriteSheet.png', {frameWidth: 150, frameHeight: 147});
    this.load.spritesheet('button_comp', 'Boton_morado_SpriteSheet.png', {frameWidth: 150, frameHeight: 147});

    // Manual
    this.load.setPath('assets/sprites/manual');
    this.load.image('close_manual', 'close_manual.png');
    this.load.spritesheet('open_manualF', 'open_manualF.png', {frameWidth: 96, frameHeight: 48});
    this.load.spritesheet('close_manualF', 'close_manualF.png', {frameWidth: 248, frameHeight: 248});
    this.load.spritesheet('close_manual(open)', 'close_manual(open).png', {frameWidth: 496, frameHeight: 248});
    this.load.spritesheet('open_manual(close)', 'open_manual(close).png', {frameWidth: 496, frameHeight: 248})
  }

  // Creación de la escena
  // En este caso, solo se pasa a la escena del primer nivel
  create() {
    this.scene.start('day1');
  }
}