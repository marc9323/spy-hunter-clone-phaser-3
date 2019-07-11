class Road extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        // add to the scene the road image
        this.back = this.scene.add.image(0, 0, 'road');
        // add to the Container the back image
        this.add(this.back);
        // add the container to the scene
        this.scene.add.existing(this);

        // this.back.displayWidth = game.config.width * 0.5;
        // this.back.scaleY = this.back.scaleX;

        Align.scaleToGameW(this.back, 0.5);

        console.log(this);

        this.setSize(this.back.displayWidth, game.config.height);

        this.lineGroup = this.scene.add.group();

        // count how many times we move the lines
        this.count = 0;

        // add the car, 25 percent over on left, 90% down
        // the x of the road where the lines are going down is
        // zero position, so if we make x of car negative it appear
        // in the other lane
        this.car = this.scene.add.sprite(
            this.displayWidth / 4,
            game.config.height * 0.9,
            'cars'
        );

        Align.scaleToGameW(this.car, 0.1);
        // add the car to the Road (container)
        this.add(this.car);

        // add click event on the road // remember to pass 'this'!
        this.back.setInteractive();
        this.back.on('pointerdown', this.changeLanes, this);

        this.addObject();
    }

    addObject() {
        var objs = [
            { key: 'pcar1', speed: 10, scale: 10 },
            { key: 'pcar2', speed: 10, scale: 10 },
            { key: 'cone', speed: 20, scale: 5 },
            { key: 'barrier', speed: 20, scale: 8 }
        ];
        var index = Math.floor(Math.random() * 4);
        var key = objs[index].key;
        var speed = objs[index].speed;
        var scale = objs[index].scale / 100; //to get the percent
        // put it in the left hand lane
        this.object = this.scene.add.sprite(-this.displayWidth / 4, 0, key);
        this.object.speed = speed;
        var lane = Math.random() * 100;
        // 50% chance of being in the right hand lane
        if (lane < 50) {
            this.object.x = this.displayWidth / 4;
        }
        Align.scaleToGameW(this.object, scale);
        // add it to the road, make it a child of the road
        this.add(this.object);
    }

    changeLanes() {
        if (this.car.x > 0) {
            // we know its on right hand side of road
            this.car.x = -this.displayWidth / 4;
        } else {
            this.car.x = this.displayWidth / 4;
        }
    }

    makeLines() {
        this.vSpace = this.displayHeight / 10; // 1/10th height of road
        for (var i = 0; i < 20; i++) {
            // add lines to scene
            var line = this.scene.add.image(this.x, this.vSpace * i, 'line');
            // record old y position
            line.oy = line.y;
            this.lineGroup.add(line);
        }
    }

    moveLines() {
        console.log('move lines');
        this.lineGroup.children.iterate(
            function(child) {
                child.y += this.vSpace / 20;
            }.bind(this)
        ); // bind to the road, make this refer to the road

        this.count++;
        if (this.count == 20) {
            this.count = 0;
            this.lineGroup.children.iterate(
                function(child) {
                    child.y = child.oy; // reset to original y
                }.bind(this)
            );
        }
    }

    moveObject() {
        this.object.y += this.vSpace / this.object.speed;
        // check for collisions
        if (Collision.checkCollide(this.car, this.object)) {
            this.car.alpha = 0.5;
        } else {
            this.car.alpha = 1;
        }
        if (this.object.y > game.config.height) {
            emitter.emit(G.UP_POINTS, 1);
            // if its below the bottom of the game destroy the object
            this.object.destroy();
            this.addObject();
        }
    }
}
