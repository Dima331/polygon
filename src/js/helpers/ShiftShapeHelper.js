const RESIZE_LENGTH = 20;

export function getHeight(shape) {
  return shape.points[1].y - shape.points[2].y;
}

export function getWidth(shape) {
  return shape.points[1].x - shape.points[0].x;
}

export function isCrossLeft(firstRectangle, secondRectangle) {
  if (firstRectangle.points[3].x > secondRectangle.points[2].x
    && firstRectangle.points[3].y < secondRectangle.points[1].y
    && firstRectangle.points[0].y > secondRectangle.points[2].y
    && (firstRectangle.points[3].x - RESIZE_LENGTH) < secondRectangle.points[2].x) {
    return true;
  }

  return false;
}

export function isCrossRight(firstRectangle, secondRectangle) {
  if (firstRectangle.points[2].x < secondRectangle.points[3].x
    && firstRectangle.points[2].y < secondRectangle.points[0].y
    && firstRectangle.points[1].y > secondRectangle.points[3].y
    && (RESIZE_LENGTH + firstRectangle.points[2].x) > secondRectangle.points[3].x) {
    return true;
  }

  return false;
}

export function isCrossTop(firstRectangle, secondRectangle) {
  if (firstRectangle.points[0].y < secondRectangle.points[3].y
    && firstRectangle.points[3].x < secondRectangle.points[1].x
    && firstRectangle.points[2].x > secondRectangle.points[0].x
    && (firstRectangle.points[0].y + RESIZE_LENGTH) > secondRectangle.points[3].y) {
    return true;
  }

  return false;
}

export function isCrossBottom(firstRectangle, secondRectangle) {
  if (firstRectangle.points[3].y > secondRectangle.points[0].y
    && firstRectangle.points[3].x < secondRectangle.points[1].x
    && firstRectangle.points[2].x > secondRectangle.points[0].x
    && (firstRectangle.points[3].y - RESIZE_LENGTH) < secondRectangle.points[0].y) {
    return true;
  }

  return false;
}
