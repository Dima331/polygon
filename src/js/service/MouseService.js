const MOUSE_BLOCK = 50;

export default class MouseService {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.staticX = 0;
        this.staticY = 0;
    }

    getCoordinate() {
        return {
            x: this.x,
            y: this.y
        }
    }

    setCoordinate(x, y) {
        this.x = x;
        this.y = y;
    }

    saveStaticCoordinate(x, y) {
        this.staticX += x;
        this.staticY += y;
    }

    deleteStaticCoordinate() {
        this.staticX = 0;
        this.staticY = 0;
    }

    isBlockMove() {
        if (this.staticX > MOUSE_BLOCK
            || this.staticX < -MOUSE_BLOCK
            || this.staticY > MOUSE_BLOCK
            || this.staticY < -MOUSE_BLOCK) {
            return false;
        }

        return true
    }
}