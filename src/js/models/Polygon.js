import { PointInPolygon } from '../math/points';

export default class Polygon {
    constructor(id, points) {
        this.points = points;
        this.id = id;
        this.intersections = [];
        this._isIntersected = false;
    }

    draw(ctx) {
        if (this.intersections.length !== 0) {
            this._isIntersected = true;
        }

        ctx.beginPath();
        ctx.moveTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
        this.points.forEach(n => ctx.lineTo(n.x, n.y));
        ctx.fillStyle = this.getFillStroke();
        ctx.fill();
        ctx.stroke();

    }

    getFillStroke() {
        if (this._isIntersected) {
            return '#FF0000';
        }

        return "#FFFFFF";
    }

    mouseIn(mouse) {
        return PointInPolygon(mouse, ...this.points);
    }

    addFigure(id) {
        if (this.intersections.indexOf(id) === -1) {
            this.intersections.push(id);
            this._isIntersected = true;
        }
    }

    deleteFigure(id) {
        const index = this.intersections.indexOf(id);

        if (this.intersections.indexOf(id) > -1) {
            this.intersections.splice(index, 1);
            this._isIntersected = false;
        }
    }
}
