import shapes from '../config/polygonShapes';
import { connectingPoints } from '../helpers/ArrangeDotsHelper';
import { getCoordinates } from '../helpers/ArrangeDotsHelper';
import { initializeDots } from '../helpers/InitializePolygonHelper';
import { initializeCorners } from '../helpers/InitializePolygonHelper';
import Rectangle from '../models/Rectangle';

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
            const staticPoints = JSON.parse(JSON.stringify(figure));

            polygons.push(new Rectangle(index, figure, staticPoints));

            return indent += INDENT;
        }, 0)

        return polygons;
    }

    drawAll(polygons, canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        polygons.forEach(polygon => polygon.draw(ctx));
    }
}