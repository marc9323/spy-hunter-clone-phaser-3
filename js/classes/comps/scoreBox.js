class ScoreBox extends Phaser.GameObjects.Container {
    constructor(config) {
        console.log('scorebox created');
        super(config.scene);
        this.scene = config.scene;

        this.text1 = this.scene.add.text(0, 0, 'Score: 0');
        this.text1.setOrigin(0.5, 0.5);
        // add text to the container
        this.add(this.text1);

        // as we always do with containers we need to add it to the scene
        this.scene.add.existing(this);

        // listen for score updating event, be sure to add this as scope
        // for emitter listener
        emitter.on(G.SCORE_UPDATED, this.scoreUpdated, this);
    }

    scoreUpdated() {
        this.text1.setText(`Score: ${model.score}`);
    }
}
