export function initializeDots() {
    const dots = [];

    const height = getRandomDot(1, 30);
    const width = getRandomDot(20, 50);

    dots.push({
        x: getRandomDot(-50, -50),
        y: getRandomDot(-height, -height)
    }, {
        x: getRandomDot(width, width),
        y: getRandomDot(-height, -height)
    }, {
        x: getRandomDot(width, width),
        y: getRandomDot(50, 50)
    }, {
        x: getRandomDot(-50, -50),
        y: getRandomDot(50, 50)
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