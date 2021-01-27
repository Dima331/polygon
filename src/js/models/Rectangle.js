import { getHeight } from '../helpers/ShiftShapeHelper';
import { getWidth } from '../helpers/ShiftShapeHelper';
import Polygon from './Polygon';

export default class Rectangle extends Polygon {
  moveTop(distance) {
    const height = getHeight(this);

    distance += 1;

    this.points[3].y = distance;
    this.points[2].y = distance;
    this.points[0].y = distance + height;
    this.points[1].y = distance + height;
  }

  moveBottom(distance) {
    const height = getHeight(this);

    distance -= 1;

    this.points[0].y = distance;
    this.points[1].y = distance;
    this.points[3].y = distance - height;
    this.points[2].y = distance - height;
  }

  moveRight(distance) {
    const width = getWidth(this);

    distance += 1;

    this.points[0].x = distance;
    this.points[3].x = distance;
    this.points[1].x = (distance + width);
    this.points[2].x = (distance + width);
  }

  moveLeft(distance) {
    const width = getWidth(this);

    distance -= 1;

    this.points[1].x = distance;
    this.points[2].x = distance;
    this.points[0].x = distance - width;
    this.points[3].x = distance - width;
  }
}