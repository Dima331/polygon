export default class MouseService {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getCoordinate() {
        return {
            x: this.x,
            y: this.y
        }
    }

    setCoordinate(x, y){
        this.x = x;
        this.y = y;
    }
}