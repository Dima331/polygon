export function getCoordinates(rightWays, dots, indent) {
    const figure = [];

    rightWays.forEach(numberPoint => {
        figure.push({
            'x': (indent + 200) + dots[numberPoint].x,
            'y': 300 - dots[numberPoint].y
        });
    });

    return figure;
}