import './styles/index.scss';
import { getCrossPolygon } from './js/helpers/CrossPolygonHelper';
import MouseService from './js/service/MouseService'
import SelectedPoligonService from './js/service/SelectedPoligonService'
import PolygonService from './js/service/PolygonService'

window.onload = function () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.setAttribute('height', window.innerHeight);
  canvas.setAttribute('width', window.innerWidth);

  const mouseService = new MouseService(0, 0);
  const selectedPoligonService = new SelectedPoligonService();
  const polygonService = new PolygonService();
  const polygons = polygonService.initializePolygons();

  polygonService.drawAll(polygons, canvas, ctx);

  window.onmousemove = function (e) {
    mouseService.setCoordinate(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop)

    if (selectedPoligonService.selectedPolygon) {
      selectedPoligonService.selectedPolygon.move(e.movementX, e.movementY);

      polygonService.drawAll(polygons, canvas, ctx);
    }
  };

  window.onmouseup = function () {
    if (selectedPoligonService.selectedPolygon) {
      polygons.forEach((shape, key) => {
        if (selectedPoligonService.selectedPolygon.id === shape.id) {
          return;
        }

        if (getCrossPolygon(shape.points, selectedPoligonService.selectedPolygon.points)) { ///
          shape.addIntersection(selectedPoligonService.selectedPolygon.id);
          selectedPoligonService.selectedPolygon.addIntersection(key);
        } else {
          shape.deleteIntersection(selectedPoligonService.selectedPolygon.id);
          selectedPoligonService.selectedPolygon.deleteIntersection(key);
        }
      })
    }

    polygonService.drawAll(polygons, canvas, ctx);

    selectedPoligonService.removeSelectedPolygon();
  };

  window.onmousedown = function () {
    if (!selectedPoligonService.selectedPolygon) {
      polygons.forEach(shape => {
        if (shape.isPointInPolygon(mouseService.getCoordinate())) {
          selectedPoligonService.selectedPolygon = shape;
        }
      });
    }
  }
}