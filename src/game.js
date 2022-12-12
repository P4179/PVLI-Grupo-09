import Title from './scenes/title.js';
import Boot from './scenes/boot.js';
import Day1 from './scenes/day1.js'
import Day2 from './scenes/day2.js'
import Day3 from './scenes/day3.js'
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
            width: 300,
            height: 200
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
    // escenas que hay en el juego
    scene: [Title, Boot, Day1, Day2, Day3, End],
    title: "Proyecto final"
};

new Phaser.Game(config);