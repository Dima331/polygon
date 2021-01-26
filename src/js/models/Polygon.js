import { calculateVectorClick } from '../helpers/GetVectorHelper';
import { getHeight } from '../helpers/ShiftShapeHelper';
import { getWidth } from '../helpers/ShiftShapeHelper';


export default class Polygon {
  constructor(id, points, staticPoints) {
    this.id = id;
    this.points = points;
    this._staticPoints = staticPoints;
    this.intersections = [];
    this._isIntersected = false;
    this.merger = [];
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);

    this.points.forEach(point => ctx.lineTo(point.x, point.y));

    ctx.fillStyle = this.getFillStroke();
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
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
    if (this.intersections.indexOf(id) === -1) {
      this.intersections.push(id);
      this._isIntersected = true;
    }
  }

  deleteIntersection(id) {
    const index = this.intersections.indexOf(id);

    if (this.intersections.indexOf(id) !== -1) {
      this.intersections.splice(index, 1);

      if (this.intersections.length === 0) {
        this._isIntersected = false;
      }
    }
  }

  addMerger(id) {
    if (this.merger.indexOf(id) === -1) {
      this.merger.push(id);
    }
  }

  deleteMerger(id) {
    const index = this.merger.indexOf(id);

    if (this.merger.indexOf(id) !== -1) {
      this.merger.splice(index, 1);
    }
  }



  move(dx, dy) {
    this.points.forEach((point) => {
      point.x += dx;
      point.y += dy;
    })
  }

  rebootPoints() {
    this.points = JSON.parse(JSON.stringify(this._staticPoints));
  }

  moveTop(distance) {
    const height = getHeight(this);

    distance += 1;

    this.points[3].y = distance; 
    this.points[2].y = distance; 
    this.points[0].y = distance + height;
    this.points[1].y = distance + height;

    this.attached = true;
  }

  moveBottom(distance) {
    const height = getHeight(this);

    distance -= 1;

    this.points[0].y = distance; 
    this.points[1].y = distance;
    this.points[3].y = distance - height;
    this.points[2].y = distance - height;

    this.attached = true;
  }

  moveRight(distance) {
    const width = getWidth(this);

    distance += 1;

    this.points[0].x = distance;
    this.points[3].x = distance;
    this.points[1].x = (distance + width);
    this.points[2].x = (distance + width);

    this.attached = true;
  }

  moveLeft(distance) {
    const width = getWidth(this);

    distance -= 1;

    this.points[1].x = distance; 
    this.points[2].x = distance;
    this.points[0].x = distance - width; 
    this.points[3].x = distance - width;

    this.attached = true;
  }
}