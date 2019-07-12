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

        // button images
        this.load.image('button1', 'images/ui/buttons/2/1.png');
        this.load.image('button2', 'images/ui/buttons/2/5.png');

        // delete
        this.load.image('face', 'images/face.png');
    }
    create() {
        // delete
        // emitter = new Phaser.Events.EventEmitter();
        // controller = new Controller();

        // add scorebox
        this.sb = new ScoreBox({ scene: this });
        this.sb.x = game.config.width - 60;
        this.sb.y = 50;

        // define objects
        this.road = new Road({ scene: this });
        this.road.x = game.config.width / 2;
        this.road.makeLines();

        this.alignGrid = new AlignGrid({ scene: this, rows: 5, cols: 5 });
        this.alignGrid.showNumbers();

        // place scorebox according to grid
        this.alignGrid.placeAtIndex(4, this.sb);

        /// delete temp
        // var gridConfig = { rows: 5, cols: 5, scene: this };
        // var alignGrid = new AlignGrid(gridConfig);
        // alignGrid.show();

        // this.face = this.add.sprite(0, 0, 'face');
        // alignGrid.placeAtIndex(17, this.face);
        // alignGrid.showNumbers();
        // Align.scaleToGameW(this.face, 0.2);

        // create a button

        var fireText = { color: 'black', fontSize: 30 };
        var flatButton = new FlatButton({
            scene: this,
            key: 'button1',
            text: 'Fire',
            x: 100,
            y: 100,
            event: 'button_pressed',
            params: 'fire_lasers',
            textConfig: fireText
        });

        var flatButton = new FlatButton({
            scene: this,
            key: 'button2',
            text: 'Self Destruct',
            x: 240,
            y: 300,
            event: 'button_pressed',
            params: 'self_destruct'
        });

        emitter.on('button_pressed', this.buttonPressed, this);
    }
    buttonPressed(params) {
        console.log(params);
    }
    update() {
        // game loop
        this.road.moveLines();
        this.road.moveObject();
    }
}
