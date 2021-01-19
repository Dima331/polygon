import { calculateVectorClick } from '../helpers/GetVectorHelper';

export default class Polygon {
  constructor(id, points) {
    this.points = points;
    this.id = id;
    this._intersections = [];
    this._isIntersected = false;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
    
    this.points.forEach(point => ctx.lineTo(point.x, point.y));
    
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

  isPointInPolygon(mouse) {
    const entries = [];
    let previousVertex = this.points[this.points.length - 1];

    this.points.forEach((vertex) => {
      entries.push(calculateVectorClick(mouse, previousVertex, vertex) < 0);
      previousVertex = vertex;
    })

    return this.points.length === entries.filter(value => value).length;
  }

  addIntersection(id) {
    if (this._intersections.indexOf(id) === -1) {
      this._intersections.push(id);
      this._isIntersected = true;
    }
  }

  deleteIntersection(id) {
    const index = this._intersections.indexOf(id);

    if (this._intersections.indexOf(id) !== -1) {
      this._intersections.splice(index, 1);

      if (this._intersections.length === 0) {
        this._isIntersected = false;
      }
    }
  }

  move(dx, dy) {
    this.points.forEach((point) => {
      point.x += dx;
      point.y += dy;
    })
  }
}