// CONFIGURACIÓN DE PHASER
// SE CREA LA CLASE PHASER QUE SE ENCARGA DE CREAR E INICIAR EL JUEGO

let config = {
    type: Phaser.AUTO,
    parent: 'juego',
    width:  1000,
    height: 500,
    pixelArt: true,
    // canvas de phaser se escale a la pantalla
    // se establece un mínimo y un máximo de tamño
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        /*
        mode: Phaser.Scale.FIT,
        // tamaño mínimo de pantalla
        min: {
            width: 328,
            height: 188
        },
        // tamaño máximo de pantalla
        max: {
            width: 1312,
            height: 752
        },
        */
        zoom: 1
    },
    scene: [],
};

new Phaser.Game(config);