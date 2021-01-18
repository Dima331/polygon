export default class MouseService {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    get coordinate(){
        return {
            x: this.x,
            y: this.y
        }
    }

    get coordinateX(){
        return this.x;
    }

    set coordinateX(x){
        this.x = x;
    }

    get coordinateY(){
        return this.y;
    }

    set coordinateY(y){
        this.y = y;
    }
}