import  PointInPolygon from '../math/points';

export default class Polygon {
    constructor(number, ...points) {
        this.points = points;
        this.number = number;
        this.intersections = [];
        this.color = false;
    }

    activeFigure(canvas, active) {
        if (this.number === active.number) {
            this.color = false;
        }
        canvas.beginPath();
        if (this.color && this.intersections.length > 0) {
            canvas.moveTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
            this.points.forEach(n => canvas.lineTo(n.x, n.y));
            canvas.fill();
            canvas.stroke();
        } else {
            canvas.moveTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
            this.points.forEach(n => canvas.lineTo(n.x, n.y));
            canvas.stroke();
        }
    }
    draw(canvas, active) {
        if (active) {
            this.color = true;
        }
        if (this.intersections.length == 0) {
            this.color = false;
        }
        
        canvas.beginPath();
        if (active || this.color) {
            canvas.moveTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
            this.points.forEach(n => canvas.lineTo(n.x, n.y));
            canvas.fill();
            canvas.stroke();

        } else {
            canvas.moveTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
            this.points.forEach(n => canvas.lineTo(n.x, n.y));
            canvas.stroke();
        }

    }
    mouseIn(mouse) {
        return PointInPolygon(mouse, ...this.points)
    }
}
