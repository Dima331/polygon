export default function PointInPolygon(pointMouse, ...vectors) {
    let entry = [];

    for (let i = 0; i < vectors.length; i++) {
        if (i == vectors.length - 1) {
            entry.push(calculateVectorClick(pointMouse, vectors[i], vectors[0]) < 0);
        } else {
            entry.push(calculateVectorClick(pointMouse, vectors[i], vectors[i + 1]) < 0);
        }
    }

    let count = entry.filter(value => { return value });

    return vectors.length == count.length;
}

export function calculateVectorClick(p1, p2, p3) {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}