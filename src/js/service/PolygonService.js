import shapes from '../config/polygonShapes';
import { connectingPoints } from '../helpers/ArrangeDotsHelper';
import { getCoordinates } from '../helpers/ArrangeDotsHelper';
import { initializeDots } from '../helpers/InitializePolygonHelper';
import { initializeCorners } from '../helpers/InitializePolygonHelper';
import Polygon from '../models/Polygon';

const INDENT = 350;

export default class PolygonService {
    initializePolygons() {
        const polygons = [];
        const forms = shapes.shapes;

        forms.reduce((indent, form, index) => {
            const dots = initializeDots();
            const numberOfCorner = initializeCorners(form);
            const pointsOfPolygon = connectingPoints(dots, numberOfCorner);
            const figure = getCoordinates(pointsOfPolygon, dots, indent);

            polygons.push(new Polygon(index, figure));

            return indent += INDENT;
        }, 0)

        return polygons;
    }

    drawAll(polygons, canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        polygons.forEach(polygon => polygon.draw(ctx));
    }
}