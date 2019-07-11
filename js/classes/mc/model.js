// folder mc = model controller

class Model {
    constructor() {
        this._score = 0;
    }

    // setter - getter, instead of going to this.score it will go to function
    set score(val) {
        this._score = val;
        console.log('score updated: ' + this._score);
        emitter.emit(G.SCORE_UPDATED);
    }

    get score() {
        return this._score;
    }
}
