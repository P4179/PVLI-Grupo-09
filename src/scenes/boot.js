// Escena para la precarga de assets que se utilizarán en el juego, es decir, los sprites

export default class Boot extends Phaser.Scene {
  // Constructor
  constructor() {
    super({ key: 'boot' });
  }

  // Carga de los assets del juego
  preload() {
    // NIVELES
    this.load.setPath('./assets/levels');
    // Días
    this.load.text('day1', 'day1.json');
    this.load.text('day2', 'day2.json');
    this.load.text('day3', 'day3.json');
    // Niveles de cajas
    this.load.tilemapTiledJSON('tilemap_nivel_1', 'mapa_tiles/box_map_1.json');
    this.load.tilemapTiledJSON('tilemap_nivel_2', 'mapa_tiles/box_map_2.json');
    this.load.image('patrones_tilemap', 'mapa_tiles/prueba.png');
    
    // TEXTO BITMAP
    this.load.setPath('./assets/fonts');
    // Texto
    this.load.bitmapFont('generalFont', 'generalFont/general_bitmap.png', 'generalFont/general_bitmap.xml');
    // Texto para el periódico
    this.load.bitmapFont('newsFont', 'newsFont/news_bitmap.png', 'newsFont/news_bitmap.xml');
    // Texto para los diálogos
    this.load.bitmapFont('dialogsFont', 'dialogsFont/dialogs_bitmap.png', 'dialogsFont/dialogs_bitmap.xml');
    
    // SPRITES
    // Fondo de los niveles
    this.load.setPath('./assets/sprites/fondos');
    this.load.image('templo', 'templo.png');
    this.load.image('mesa', 'mesa.png');
    this.load.image('background', 'Background.png');
    this.load.image('trees', '4.png');
    this.load.image('mountains1', '1.png');
    this.load.image('mountains2', '2.png');
    
    // Estatuas
    this.load.setPath('./assets/sprites/estatuas');
    // Spritesheets de las estatuas
    this.load.spritesheet('manGreen', 'animacion_retrato_hombre_5_spritesheet.png', {frameWidth: 420, frameHeight: 420});
    this.load.spritesheet('man1', 'animacion_retrato_hombre_1_spritesheet.png', {frameWidth: 420, frameHeight: 420});
    this.load.spritesheet('man2', 'animacion_retrato_hombre_2_spritesheet.png', {frameWidth: 420, frameHeight: 420});
    this.load.spritesheet('man3', 'animacion_retrato_hombre_3_spritesheet.png', {frameWidth: 420, frameHeight: 420});
    this.load.spritesheet('man4', 'animacion_retrato_hombre_4_spritesheet.png', {frameWidth: 420, frameHeight: 420});
    this.load.spritesheet('woman1', 'animacion_retrato_mujer_1_spritesheet.png', {frameWidth: 420, frameHeight: 420});
    this.load.spritesheet('woman2', 'animacion_retrato_mujer_2_spritesheet.png', {frameWidth: 420, frameHeight: 420});
    this.load.spritesheet('woman3', 'animacion_retrato_mujer_3_spritesheet.png', {frameWidth: 420, frameHeight: 420});
    this.load.spritesheet('woman4', 'animacion_retrato_mujer_4_spritesheet.png', {frameWidth: 420, frameHeight: 420});
    // Estatuas falsas
    this.load.image('man1_Fake', 'retrato_hombre_1_FAKE.png');
    this.load.image('man2_Fake', 'retrato_hombre_2_FAKE.png');
    this.load.image('man3_Fake', 'retrato_hombre_3_FAKE.png');
    this.load.image('man4_Fake', 'retrato_hombre_4_FAKE.png');
    this.load.image('woman1_Fake', 'retrato_mujer_1_FAKE.png');
    this.load.image('woman2_Fake', 'retrato_mujer_2_FAKE.png');
    this.load.image('woman3_Fake', 'retrato_mujer_3_FAKE.png');
    this.load.image('woman4_Fake', 'retrato_mujer_4_FAKE.png');
    
    // Documentos
    this.load.setPath('./assets/sprites/documentos');
    this.load.image('auth_cert', 'AccessPermitInner.png');  // certificado de autenticidad
    this.load.image('auth_paper', 'IdSupplementInner.png'); // tarjeta de identidad
    this.load.image('mat_reg', 'MaterialRecord.png'); // carnet de materiales
    
    // Otros
    this.load.setPath('./assets/sprites/otros');
    // Periodico
    this.load.image('daily_news', 'News.png');
    // Cajas
    this.load.image('m_box', 'm_box.png');
    // Sellos de museos
    this.load.spritesheet('stamp_sprites', 'Stamps.png', {frameWidth: 42, frameHeight: 42});
    // Explosivo
    this.load.image('explosive', 'Explosivo.png');
    // Vacío
    this.load.image('empty', 'vacio.png');
    // XRAY Escaner
    this.load.image('escaner','rayosx.png');
    // Calendario
    this.load.spritesheet('calendar', 'calendar.png', {frameWidth: 640, frameHeight: 480});
    // Farollillos
    this.load.image('lantern1', 'Farolillo1.png');
    this.load.image('lantern2', 'Farolillo2.png');
    this.load.image('lantern3', 'Farolillo3.png');
    // Reloj
    this.load.image('reloj', 'reloj.png');
    // Números del reloj
    this.load.spritesheet('nums_reloj', 'nums_reloj.png', {frameWidth: 62.8, frameHeight: 120});
    // Puntos del reloj
    this.load.image('puntos', 'puntos.png');
    // Bola de tenis
    this.load.spritesheet('bola_tenis', 'bola_tenis.png', {frameWidth: 37.625, frameHeight: 39.5})
    //colores para material record
    this.load.spritesheet('colores_registro_material', 'todoscolores.png', {frameWidth: 64, frameHeight:64})

    // Botones
    this.load.setPath('./assets/sprites/botones');
    this.load.spritesheet('button_yes', 'Boton_verde_Spritesheet.png', {frameWidth: 150, frameHeight: 147});
    this.load.spritesheet('button_no', 'Boton_rojo_Spritesheet.png', {frameWidth: 150, frameHeight: 147});
    this.load.spritesheet('button_xray', 'Boton_azul_Spritesheet.png', {frameWidth: 150, frameHeight: 147});
    this.load.spritesheet('button_comp', 'Boton_morado_Spritesheet.png', {frameWidth: 150, frameHeight: 147});

    // Manual
    this.load.setPath('./assets/sprites/manual');
    this.load.image('close_manual', 'close_manual.png');
    this.load.spritesheet('open_manualF', 'open_manualF.png', {frameWidth: 96, frameHeight: 48});
    this.load.spritesheet('close_manualF', 'close_manualF.png', {frameWidth: 248, frameHeight: 248});
    this.load.spritesheet('close_manual(open)', 'close_manual(open).png', {frameWidth: 496, frameHeight: 248});
    this.load.spritesheet('open_manual(close)', 'open_manual(close).png', {frameWidth: 496, frameHeight: 248});
    this.load.image('colores','colores.png');
    this.load.image('xrayItems','Items.png');
    this.load.image('validStamps','validStamps.png');

    // Niveles cajas
    this.load.setPath('./assets/sprites/niveles_cajas');
    this.load.spritesheet('reset', 'reset.png', {frameWidth: 39, frameHeight: 44});
    this.load.spritesheet('character', 'player.png', {frameWidth: 64, frameHeight: 64});
    this.load.image('batt', 'battery.png');

    // Sprites pantalla familia
    this.load.setPath('assets/sprites/familia');
    this.load.spritesheet('button_family', 'button_family.png', {frameWidth: 290, frameHeight: 290});
    this.load.image('white_line', 'white_line.png');

    // AUDIOS
    this.load.setPath('./assets/audio');
    this.load.audio("success", "success.mp3");
    this.load.audio("error", "error.mp3");
    this.load.audio("documentsS", "documents.mp3");
    this.load.audio("demoAudio", "Shinrin-Yoku.ogg");
    this.load.audio("manualA", "manual.mp3");
    this.load.audio("xrayS", "beep.mp3");
    this.load.audio('high_sound', 'plate_breaking.mp3');
    this.load.audio('low_sound', 'stone_hit.mp3');
  }

  // Creación de la escena
  // En este caso, solo se pasa a la escena del primer nivel
  create() {
    this.scene.start('initialScene');
  }
}