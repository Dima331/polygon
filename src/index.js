import './styles/index.scss';
import { convexPolygonsCollide } from './js/math/collide';
import MouseService from './js/service/MouseService'
import SelectedPolygonService from './js/service/SelectedPolygonService'
import PolygonService from './js/service/PolygonService'


window.onload = function () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.setAttribute('height', window.innerHeight);
  canvas.setAttribute('width', window.innerWidth);
  ctx.fillStyle = 'red';

  const mouse = new MouseService(0, 0);
  const selected = new SelectedPolygonService();
  const polygons = new PolygonService();
  const shapes = polygons.initializeFigures();

  polygons.drawAll(ctx, shapes);

  window.onmousemove = function (e) {
    mouse.coordinateX = e.pageX - canvas.offsetLeft;
    mouse.coordinateY = e.pageY - canvas.offsetTop;

    if (selected.selectedPolygon) {
      selected.selectedPolygon.points.forEach(shape => {
        shape.x += e.movementX;
        shape.y += e.movementY;
      })

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      polygons.drawAll(ctx, shapes);
    }
  };

  window.onmouseup = function () {
    if (selected.selectedPolygon) {
        shapes.forEach((shape, key) => { 
        if (selected.selectedPolygon.id === shape.id) {
          return;
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
    polygons.drawAll(ctx, shapes);
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