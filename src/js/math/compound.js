export function connectingPoints(dots, numberOfCorner, calculateVectorDraw) {
    let rightWays = [];

    for (let k = 0; k < dots.length; k++) {
        let minI = 0;
        let min = dots[k][0].x;

        for (let i = 1; i < dots[k].length; i++) {
            if (dots[k][i].x < min) {
                min = dots[k][i].x;
                minI = i;
            }
        }

        numberOfCorner[k][0] = minI;
        numberOfCorner[k][minI] = 0;

        for (let i = 1; i < numberOfCorner[k].length - 1; i++) {
            for (let j = i + 1; j < numberOfCorner[k].length; j++) {
                let rightVector = calculateVectorDraw({
                    'x1': dots[k][numberOfCorner[k][0]].x,
                    'y1': dots[k][numberOfCorner[k][0]].y,
                    'x2': dots[k][numberOfCorner[k][i]].x,
                    'y2': dots[k][numberOfCorner[k][i]].y
                },
                    dots[k][numberOfCorner[k][j]].x,
                    dots[k][numberOfCorner[k][j]].y);
                if (rightVector < 0) {
                    let temp = numberOfCorner[k][i];
                    numberOfCorner[k][i] = numberOfCorner[k][j];
                    numberOfCorner[k][j] = temp;
                }

            }
        }

        let rightWay = [];
        rightWay[0] = numberOfCorner[k][0];
        rightWay[1] = numberOfCorner[k][1];

        for (let i = 2; i < numberOfCorner[k].length; i++) {
            while (calculateVectorDraw({
                'x1': dots[k][rightWay[rightWay.length - 2]].x,
                'y1': dots[k][rightWay[rightWay.length - 2]].y,
                'x2': dots[k][rightWay[rightWay.length - 1]].x,
                'y2': dots[k][rightWay[rightWay.length - 1]].y
            }, dots[k][numberOfCorner[k][i]].x, dots[k][numberOfCorner[k][i]].y) < 0) {
                rightWay.pop();
            }
            rightWay.push(numberOfCorner[k][i]);
        }
        rightWays.push(rightWay);
    }
    return rightWays;
}