// sample config object: {
//     scene: this,
//     key: 'button1',
//     text: 'start',
//     event: 'start_game'
// }

class FlatButton extends Phaser.GameObjects.Container {
    constructor(config) {
        if (!config.scene) {
            console.log('missing scene!');
            return;
        }
        if (!config.key) {
            console.log('missing key');
            return;
        }

        super(config.scene);

        this.config = config;

        this.scene = config.scene;
        // background of button, add to scene
        this.back = this.scene.add.image(0, 0, config.key);

        // add in the back to this FlatButton container
        this.add(this.back);

        if (config.text) {
            if (config.textConfig) {
                this.text1 = this.scene.add.text(
                    0,
                    0,
                    config.text,
                    config.textConfig
                );
            } else {
                this.text1 = this.scene.add.text(0, 0, config.text);
            }

            this.text1.setOrigin(0.5, 0.5);
            this.add(this.text1);
        }

        if (config.x) {
            this.x = config.x;
        }

        if (config.y) {
            this.y = config.y;
        }

        // add to scene as an existing object
        this.scene.add.existing(this);

        if (config.event) {
            this.back.setInteractive();
            this.back.on('pointerdown', this.pressed, this);
        }
    }

    pressed() {
        if (this.config.params) {
            emitter.emit(this.config.event, this.config.params);
        } else {
            emitter.emit(this.config.event);
        }
    }
}
