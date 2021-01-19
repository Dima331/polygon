export function initializeDots() {
    const dots = [];

    dots.push({
        x: getRandomDot(-50, -40),
        y: getRandomDot(-50, -40)
    }, {
        x: getRandomDot(-55, -45),
        y: getRandomDot(5, 1)
    }, {
        x: getRandomDot(5, 1),
        y: getRandomDot(50, 40)
    }, {
        x: getRandomDot(35, 25),
        y: getRandomDot(35, 25)
    }, {
        x: getRandomDot(-50, -40),
        y: getRandomDot(50, 40)
    }, {
        x: getRandomDot(50, 40),
        y: getRandomDot(5, 1)
    }, {
        x: getRandomDot(50, 40),
        y: getRandomDot(-50, -40)
    }, {
        x: getRandomDot(5, 1),
        y: getRandomDot(-70, -60)
    })

    return dots;
}

export function initializeCorners(form) {
    const numbers = [];

    for (let i = 0; i < form.corners; i++) {
        numbers.push(i);
    }

    return numbers;
}

function getRandomDot(x, y) {
    return Math.floor(Math.random() * (x - y) + x) + y;
}