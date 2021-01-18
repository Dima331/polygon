import './styles/index.scss';
import data from './js/constants/figures.json';
import { convexPolygonsCollide } from './js/math/collide';
import { connectingPoints } from './js/math/compound';
import { getCoordinates } from './js/draw/getCoordinates';
import Polygon from './js/models/Polygon';
import MouseService from './js/service/MouseService'
import SelectedPolygonService from './js/service/SelectedPolygonService'

window.onload = function () {
  const canvas = document.getElementById('canvas');
  canvas.setAttribute('height', window.innerHeight);
  canvas.setAttribute('width', window.innerWidth);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'red';

  const mouse = new MouseService(0, 0);
  const selected = new SelectedPolygonService();
  const forms = data.data;
  const shapes = [];
  let indent = 0;

  forms.forEach((form, i) => {
    const dots = initializeDots();
    const numberOfCorner = initializeCorners(form);
    const rightWays = connectingPoints(dots, numberOfCorner);
    const figure = getCoordinates(rightWays, dots, indent);

    shapes.push(new Polygon(i, figure));
    shapes[i].draw(ctx);
    indent += 350;
  });

  window.onmousemove = function (e) {
    mouse.coordinateX = e.pageX - canvas.offsetLeft;
    mouse.coordinateY = e.pageY - canvas.offsetTop;

    if (selected.selectedPolygon) {
      selected.selectedPolygon.points.forEach(shape => {
        shape.x += e.movementX;
        shape.y += e.movementY;
      })

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shapes.forEach(shape => shape.draw(ctx));
    }
  };

  window.onmouseup = function () {
    if (selected.selectedPolygon) {
        shapes.forEach((shape, key) => { 
        if (selected.selectedPolygon.id === shape.id) {
          return
        }

        if (convexPolygonsCollide([...shape.points], [...selected.selectedPolygon.points])) {
          shape.addFigure(selected.selectedPolygon.id);
          selected.selectedPolygon.addFigure(key);
        } else {
          shape.deleteFigure(selected.selectedPolygon.id);
          selected.selectedPolygon.deleteFigure(key);
        }
      })
    }

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    shapes.forEach(shape => {
      shape.draw(ctx);
    });
    selected.removeSelectedPolygon();
  };

  window.onmousedown = function () {
    if (!selected.selectedPolygon) {
      shapes.forEach(shape => {
        if (shape.mouseIn(mouse.coordinate)) {
          selected.selectedPolygon = shape;
        }
      });
    }
  }
}

function createDots(x, y) {
  return Math.floor(Math.random() * (x - y) + x) + y;
}

function initializeDots(){
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

function initializeCorners(form){
    const numbers = [];

    for(let i = 0; i < form.corners; i++){
      numbers.push(i);
    }

  return numbers;
}