export function convexPolygonsCollide(a, b) {
    let polygons = [a, b];
    let minA, maxA, projected, minB, maxB;

    for (let i = 0; i < polygons.length; i++) {
        let polygon = polygons[i];
        
        for (let i1 = 0; i1 < polygon.length; i1++) {
            let i2 = (i1 + 1) % polygon.length;
            let p1 = polygon[i1];
            let p2 = polygon[i2];
            let normal = { 
                x: p2.y - p1.y, 
                y: p1.x - p2.x 
            };
            minA = maxA = undefined;
            minB = maxB = undefined;
            
            for (let j = 0; j < a.length; j++) {
                projected = normal.x * a[j].x + normal.y * a[j].y;
                if (minA == undefined || projected < minA) {
                    minA = projected;
                }
                if (maxA == undefined || projected > maxA) {
                    maxA = projected;
                }
            }
            
            for (let j = 0; j < b.length; j++) {
                projected = normal.x * b[j].x + normal.y * b[j].y;
                if (minB == undefined || projected < minB) {
                    minB = projected;
                }
                if (maxB == undefined || projected > maxB) {
                    maxB = projected;
                }
            }

            if (maxA < minB || maxB < minA) {
                return false;
            }
        }
    }
    return true;
};