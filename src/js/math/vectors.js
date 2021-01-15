export function calculateVectorDraw(vector, x1, y1) {
    return (vector.x2 - vector.x1) * (y1 - vector.y1) - (vector.y2 - vector.y1) * (x1 - vector.x1);
}