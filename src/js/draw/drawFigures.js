export function drawFigures(rightWays, canvas, dots) {
    let figures= [];
    let indent = 0;
    console.log(rightWays)
    for (let k = 0; k < rightWays.length; k++) {
        for (let j = 0; j < rightWays.length; j++) {
            let figure = [];

            canvas.beginPath();
            canvas.moveTo((indent + 200) + dots[k][rightWays[j][0]].x, 300 - dots[k][rightWays[j][0]].y);
            figure.push({
                'x': (indent + 200) + dots[k][rightWays[j][0]].x,
                'y': 300 - dots[k][rightWays[j][0]].y
            });
            for (let i = 1; i < rightWays[j].length; i++) {
                canvas.lineTo((indent + 200) + dots[k][rightWays[j][i]].x, 300 - dots[k][rightWays[j][i]].y);
                figure.push({
                    'x': (indent + 200) + dots[k][rightWays[j][i]].x,
                    'y': 300 - dots[k][rightWays[j][i]].y
                });
            }
            canvas.closePath();
            canvas.stroke();
            indent += 350;
            figures.push(figure);
        }
        break;
    }
    return figures;
}