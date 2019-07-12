// global variables

var game;
var model;
var emitter;
var G; // game constants
var controller;

// run on window load
window.onload = function() {
    var isMobile = navigator.userAgent.indexOf('Mobile');
    if (isMobile == -1) {
        isMobile = navigator.userAgent.indexOf('Tablet');
    }

    if (isMobile == -1) {
        // desktop or laptop, not mobile
        var config = {
            type: Phaser.AUTO,
            width: 480,
            height: 640,
            parent: 'phaser-game',
            scene: [SceneTitle, SceneMain, sceneOver]
        };
    } else {
        var config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            parent: 'phaser-game',
            scene: [SceneTitle, SceneMain, sceneOver]
        };
    }

    G = new Constants();
    model = new Model();
    game = new Phaser.Game(config);
};
