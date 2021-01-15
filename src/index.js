import './styles/index.scss';
import data from './js/constants/figures.json';
import { convexPolygonsCollide } from './js/math/collide';
import { calculateVectorDraw } from './js/math/vectors';
import { connectingPoints } from './js/math/compound';
import { drawFigures } from './js/draw/drawFigures';
import Polygon from './js/models/Polygon';

function createDots(x, y) {
    return Math.floor(Math.random() * (x - y) + x) + y;
}

window.onload = function () {
    let forms = data.data;
    let dots = [];
    let numberOfCorner = [];
    let mouse = {
        x: 0,
        y: 0,
    };
    let selected = false;

    let canvas_html = document.createElement('canvas');
    canvas_html.id = 'canvas';
    canvas_html.width = window.innerWidth;
    canvas_html.height = window.innerHeight;
    document.body.appendChild(canvas_html);
    let canvas = canvas_html.getContext('2d');
    canvas.fillStyle = 'red';
    canvas.strokeStyle = 'red';

    forms.forEach(() => {
        let dot = [];

        dot.push({
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

        dots.push(dot);
    });

    forms.forEach(item => {
        let num = Array.apply(null, { length: item.corners }).map(Number.call, Number);
        numberOfCorner.push(num);
    });

    let rightWays = connectingPoints(dots, numberOfCorner, calculateVectorDraw);
    let figures = drawFigures(rightWays, canvas, dots);

    let shapes = [];
    for (let i = 0; i < figures.length; i++) {
        shapes.push(new Polygon(i, ...figures[i]));
    }
    console.log(figures)
    shapes.forEach(n => n.draw(canvas));

    window.onmousemove = function (e) {
        mouse.x = e.pageX - canvas_html.offsetLeft;
        mouse.y = e.pageY - canvas_html.offsetTop;

        if (selected) {
            selected.points.forEach(n => {
                n.x += e.movementX;
                n.y += e.movementY;
            })

            canvas.clearRect(0, 0, canvas_html.width, canvas_html.height);
            shapes.forEach(n => n.activeFigure(canvas, selected));
        }
    };

    window.onmouseup = function () {
        for (let [key1, shape1] of shapes.entries()) {
            for (let [key2, shape2] of shapes.entries()) {
                if (shape2.number == shape1.number) {
                    break;
                }
                if (convexPolygonsCollide([...shape1.points], [...shape2.points])) {
                    shape1.draw(canvas, true);
                    shape2.draw(canvas, true);
                    addFigure(key1, key2);
                } else {
                    deleteFigure(key1, key2);
                }
            }
        }

        canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (let i = 0; i < shapes.length; i++) {
            shapes[i].draw(canvas);
        }
        selected = null;
    };

    window.onmousedown = function () {
        if (!selected) {
            shapes.forEach(n => {
                if (n.mouseIn(mouse)) {
                    selected = n;
                }
            });
        }
    }

    function addFigure(firstFigure, secondFigure) {
        if (shapes[firstFigure].intersections.indexOf(secondFigure) == -1) {
            shapes[firstFigure].intersections.push(secondFigure);
            shapes[firstFigure].color = true;
        }
        if (shapes[secondFigure].intersections.indexOf(firstFigure) == -1) {
            shapes[secondFigure].intersections.push(firstFigure);
            shapes[secondFigure].color = true;
        }
    }

    function deleteFigure(firstFigure, secondFigure) {
        let index = shapes[firstFigure].intersections.indexOf(secondFigure);

        if (index > -1) {
            shapes[firstFigure].intersections.splice(index, 1);
        }
        index = shapes[secondFigure].intersections.indexOf(firstFigure);

        if (index > -1) {
            shapes[secondFigure].intersections.splice(index, 1);
        }
    }
}