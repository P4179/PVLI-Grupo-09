import Title from './scenes/title.js';
import Boot from './scenes/boot.js';
import Level1 from './scenes/level1.js'
import End from './scenes/end.js'

// Configuración de Phaser
// Se crea la clase game que se encarga de crear e iniciar el juego

let config = {
    type: Phaser.AUTO,
    // elemento donde se coloca el canvas
    parent: 'juego',
    width: 900,
    height: 600,
    pixelArt: true,
    // hacer que el canvas de Phaser se escale a la pantalla
    scale: {
        // centrar el canvas
        autoCenter: Phaser.Scale.CENTER_BOTH,
        // el modo fit escala el canvas al tamaño del elemento donde se coloca
        mode: Phaser.Scale.FIT,
        // tamaño mínimo del canvas
        min: {
            width: 328,
            height: 188
        },
        // tamaño máximo del canvas
        max: {
            width: 900,
            height: 600
        },
        // zoom se utiliza para hacer todo el juego más grande
        // 1 significa que no se modifica el tamaño
        zoom: 1
    },
    // nombre de la clase de la escena
    scene: [Title, Level1, Boot, End],
    // fisicas
    physics: { 
        default: 'arcade', 
        arcade: { 
            debug: true 
        },
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    },
    title: "Demo"
};

new Phaser.Game(config);