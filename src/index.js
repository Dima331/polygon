import './styles/index.scss';
import { getCrossPolygon } from './js/helpers/CrossPolygonHelper';
import MouseService from './js/service/MouseService'
import SelectedPoligonService from './js/service/SelectedPoligonService'
import PolygonService from './js/service/PolygonService'
import { isCrossBottom } from './js/helpers/ShiftShapeHelper';
import { isCrossRight } from './js/helpers/ShiftShapeHelper';
import { isCrossTop } from './js/helpers/ShiftShapeHelper';
import { isCrossLeft } from './js/helpers/ShiftShapeHelper';

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
    mouseService.setCoordinate(e.pageX, e.pageY);

    if (selectedPoligonService.selectedPolygon) {

      if (selectedPoligonService.selectedPolygon.merger.length !== 0) {
        mouseService.saveStaticCoordinate(e.movementX, e.movementY);

        if (!mouseService.isBlockMove()) {
          selectedPoligonService.selectedPolygon.move(mouseService.staticX, mouseService.staticY);

          polygons.forEach((shape) => {
            selectedPoligonService.selectedPolygon.merger.forEach((attachedShape) => {
              if (shape.id === attachedShape) {
                shape.deleteMerger(selectedPoligonService.selectedPolygon.id);
              }
            });
          });

          selectedPoligonService.selectedPolygon.merger = [];

          mouseService.deleteStaticCoordinate();
        } else {
          return;
        }
      }

      selectedPoligonService.selectedPolygon.move(e.movementX, e.movementY);

      polygonService.drawAll(polygons, canvas, ctx);

      polygons.forEach((shape, key) => {
        if (selectedPoligonService.selectedPolygon.id === shape.id) {
          return;
        }

        if (getCrossPolygon(shape.points, selectedPoligonService.selectedPolygon.points)) {
          shape.addIntersection(selectedPoligonService.selectedPolygon.id);
          selectedPoligonService.selectedPolygon.addIntersection(key);

        } else {
          shape.deleteIntersection(selectedPoligonService.selectedPolygon.id);
          selectedPoligonService.selectedPolygon.deleteIntersection(key);
        }
      });
    }
  };

  window.onmouseup = function () {
    if (selectedPoligonService.selectedPolygon) {
      const moveBottom = {};
      const moveRight = {};
      const moveTop = {};
      const moveLeft = {};
      let resetСoordinate = false;

      polygons.forEach((shape, key) => {
        if (selectedPoligonService.selectedPolygon.id === shape.id) {
          return;
        }

        if (selectedPoligonService.selectedPolygon.intersections.length !== 0) {
          shape.deleteIntersection(selectedPoligonService.selectedPolygon.id);
          selectedPoligonService.selectedPolygon.deleteIntersection(key);
          selectedPoligonService.selectedPolygon.resetPoints();
          resetСoordinate = true;
        }

        if (!resetСoordinate) {
          if (isCrossBottom(shape, selectedPoligonService.selectedPolygon)) {
            if (!moveBottom.distance || moveBottom.distance > shape.points[2].y) {
              moveBottom.distance = shape.points[2].y;
              moveBottom.key = key;
            }
          }

          if (isCrossRight(shape, selectedPoligonService.selectedPolygon)) {
            if (!moveRight.distance || moveRight.distance > shape.points[2].x) {
              moveRight.distance = shape.points[2].x;
              moveRight.key = key;
            }
          }

          if (isCrossTop(shape, selectedPoligonService.selectedPolygon)) {
            if (!moveTop.distance || moveTop.distance < shape.points[0].y) {
              moveTop.distance = shape.points[0].y;
              moveTop.key = key;
            }
          }

          if (isCrossLeft(shape, selectedPoligonService.selectedPolygon)) {
            if (!moveLeft.distance || moveLeft.distance < shape.points[0].x) {
              moveLeft.distance = shape.points[0].x;
              moveLeft.key = key;
            }
          }
        }
      });

      if (!resetСoordinate) {
        if (moveBottom.distance) {
          selectedPoligonService.selectedPolygon.addMerger(polygons[moveBottom.key].id);
          polygons[moveBottom.key].addMerger(selectedPoligonService.selectedPolygon.id);

          selectedPoligonService.selectedPolygon.moveBottom(moveBottom.distance);
        }

        if (moveRight.distance) {
          selectedPoligonService.selectedPolygon.addMerger(polygons[moveRight.key].id);
          polygons[moveRight.key].addMerger(selectedPoligonService.selectedPolygon.id);

          selectedPoligonService.selectedPolygon.moveRight(moveRight.distance);
        }

        if (moveTop.distance) {
          selectedPoligonService.selectedPolygon.addMerger(polygons[moveTop.key].id);
          polygons[moveTop.key].addMerger(selectedPoligonService.selectedPolygon.id);

          selectedPoligonService.selectedPolygon.moveTop(moveTop.distance);
        }

        if (moveLeft.distance) {
          selectedPoligonService.selectedPolygon.addMerger(polygons[moveLeft.key].id);
          polygons[moveLeft.key].addMerger(selectedPoligonService.selectedPolygon.id);

          selectedPoligonService.selectedPolygon.moveLeft(moveLeft.distance);
        }
      }
    }

    polygonService.drawAll(polygons, canvas, ctx);

    mouseService.deleteStaticCoordinate();

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