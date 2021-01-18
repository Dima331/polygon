export function PointInPolygon(pointMouse, ...vectors) {
    const entry = [];

    vectors.forEach((vector, i) => {
        if (i === vectors.length - 1) {
            entry.push(calculateVectorClick(pointMouse, vector, vectors[0]) < 0);
        } else {
            entry.push(calculateVectorClick(pointMouse, vector, vectors[i + 1]) < 0);
        }
    })

    return vectors.length === entry.filter(value => value).length;
}

export function calculateVectorClick(p1, p2, p3) {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}