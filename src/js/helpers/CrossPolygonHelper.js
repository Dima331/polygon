export function getCrossPolygon(firstPolygon, secondPolygon) {
    const polygons = [firstPolygon, secondPolygon];

    return polygons.every(polygon => {
        for (let i = 0; i < polygon.length; i++) {
            const secondCorner = (i + 1) % polygon.length;
            const firstNearCorner = polygon[i];  
            const secondNearCorner = polygon[secondCorner]; 
            
            const perpendicularEdge = {
                x: firstNearCorner.y - secondNearCorner.y,
                y: secondNearCorner.x - firstNearCorner.x
            };

            const firstSide = countCollide(perpendicularEdge, firstPolygon);
            const secondSide = countCollide(perpendicularEdge, secondPolygon);

            if (firstSide[1] < secondSide[0] || secondSide[1] < firstSide[0]) {
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

        if (!min || projected < min) {  
            min = projected;
        }

        if (!max || projected > max) {
            max = projected;
        }
    });

    return [min, max];
}