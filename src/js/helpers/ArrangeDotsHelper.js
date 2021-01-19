import { calculateVectorDraw } from './GetVectorHelper';

export function connectingPoints(dots, numberOfCorner) {
    let minI = 0;
    let min = dots[0].x;

    dots.forEach((dot, i) => {
        if (dot.x < min) {
            min = dot.x;
            minI = i;
        }
    });

    numberOfCorner[0] = minI;
    numberOfCorner[minI] = 0;

    for (let i = 1; i < numberOfCorner.length - 1; i++) {
        for (let j = i + 1; j < numberOfCorner.length; j++) {
            const rightVector = calculateVectorDraw({
                'x1': dots[numberOfCorner[0]].x,
                'y1': dots[numberOfCorner[0]].y,
                'x2': dots[numberOfCorner[i]].x,
                'y2': dots[numberOfCorner[i]].y
            },
                dots[numberOfCorner[j]].x,
                dots[numberOfCorner[j]].y);
            if (rightVector < 0) {
                let less = numberOfCorner[i];
                numberOfCorner[i] = numberOfCorner[j];
                numberOfCorner[j] = less;
            }
        }
    }

    return numberOfCorner;
}

export function getCoordinates(pointsOfPolygon, dots, indent) {
    const figure = [];

    const DEFAULT_TOP_INDENT = 200;
    const DEFAULT_LEFT_INDENT = 300;

    pointsOfPolygon.forEach(point => {
        figure.push({
            'x': (indent + DEFAULT_LEFT_INDENT) + dots[point].x,
            'y': DEFAULT_TOP_INDENT - dots[point].y
        });
    });

    return figure;
}