import data from '../constants/figures.json';
import { connectingPoints } from '../math/compound';
import { getCoordinates } from '../draw/getCoordinates';
import Polygon from '../models/Polygon';

export default class PolygonService {
    initializeFigures() {
        const figures = [];
        const forms = data.data;
        let indent = 0;

        forms.forEach((form, i) => {
            const dots = initializeDots();
            const numberOfCorner = initializeCorners(form);
            const rightWays = connectingPoints(dots, numberOfCorner);
            const figure = getCoordinates(rightWays, dots, indent);

            figures.push(new Polygon(i, figure));
            indent += 350;
        });
        console.log(figures)
        return figures;
    }

    drawAll(ctx, shapes) {
        shapes.forEach(shape => shape.draw(ctx));
    }
}

function createDots(x, y) {
    return Math.floor(Math.random() * (x - y) + x) + y;
}

function initializeDots() {
    const dots = [];

    dots.push({
        x: createDots(-50, -40),
        y: createDots(-50, -40)
    }, {
        x: createDots(-55, -45),
        y: createDots(5, 1)
    }, {
        x: createDots(5, 1),
        y: createDots(50, 40)
    }, {
        x: createDots(35, 25),
        y: createDots(35, 25)
    }, {
        x: createDots(-50, -40),
        y: createDots(50, 40)
    }, {
        x: createDots(50, 40),
        y: createDots(5, 1)
    }, {
        x: createDots(50, 40),
        y: createDots(-50, -40)
    }, {
        x: createDots(5, 1),
        y: createDots(-70, -60)
    })

    return dots;
}

function initializeCorners(form) {
    const numbers = [];

    for (let i = 0; i < form.corners; i++) {
        numbers.push(i);
    }

    return numbers;
}