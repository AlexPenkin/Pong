import * as Interface from './interfaces';
import Canvas from './Canvas';
export default class Game {
    private canvas: Canvas;
    constructor() {
        this.canvas = new Canvas({
            selector: 'root'
        });
    }
}