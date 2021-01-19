export default class SelectedPolygonService {
    constructor() {
        this._isPolygonSelected = false;
        this._selectedPolygon = null;
        this._points = [];
    }

    get selectedPolygon() {
        return this._selectedPolygon;
    }

    set selectedPolygon(polygon) {
        this._selectedPolygon = polygon;
    }

    removeSelectedPolygon() {
        this._isPolygonSelected = false;
        this._selectedPolygon = null;
    }
}