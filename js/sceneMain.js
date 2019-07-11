class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        // load images, sounds
        this.load.image('road', 'images/road.jpg');
        this.load.image('line', 'images/line.png');
        this.load.spritesheet('cars', 'images/cars.png', {
            frameWidth: 60,
            frameHeight: 126
        });
        this.load.image('pcar1', 'images/pcar1.png');
        this.load.image('pcar1', 'images/pcar1.png');
        this.load.image('pcar2', 'images/pcar2.png');
        this.load.image('cone', 'images/cone.png');
        this.load.image('barrier', 'images/barrier.png');

        // delete
        this.load.image('face', 'images/face.png');
    }
    create() {
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        // add scorebox
        this.sb = new ScoreBox({ scene: this });
        this.sb.x = game.config.width - 60;
        this.sb.y = 50;

        // define objects
        this.road = new Road({ scene: this });
        this.road.x = game.config.width / 2;
        this.road.makeLines();

        /// delete temp
        var gridConfig = { rows: 5, cols: 5, scene: this };
        var alignGrid = new AlignGrid(gridConfig);
        alignGrid.show();

        this.face = this.add.sprite(0, 0, 'face');
    }
    update() {
        // game loop
        this.road.moveLines();
        this.road.moveObject();
    }
}
