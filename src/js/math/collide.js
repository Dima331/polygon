export function convexPolygonsCollide(shape1, shape2) {
    const polygons = [shape1, shape2];

    return polygons.every(polygon => {
        for (let i = 0; i < polygon.length; i++) {
            const i2 = (i + 1) % polygon.length;
            const coordinate1 = polygon[i];
            const coordinate2 = polygon[i2];

            const normal = {
                x: coordinate2.y - coordinate1.y,
                y: coordinate1.x - coordinate2.x
            };

            const side1 = countCollide(normal, shape1);
            const side2 = countCollide(normal, shape2);

            if (side1[1] < side2[0] || side2[1] < side1[0]) {
                return false;
            }
        }
        return true;
    });
};

function countCollide(normal, shape) {
    let min, max, projected;

    shape.forEach(coordinate => {
        projected = normal.x * coordinate.x + normal.y * coordinate.y;
        if (min === undefined || projected < min) {
            min = projected;
        }
        if (max === undefined || projected > max) {
            max = projected;
        }
    });

    return [min, max];
}