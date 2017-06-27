import { Observable } from 'rxjs';
import * as Interface from './interfaces';
import Canvas from './Canvas';
import Player from './Player';
import Ball from './Ball';

export default class Game {
    private canvas: Canvas;
    private players: Player[] = [];
    private ball: Ball;
    private pause: boolean = true;
    private $pauseKey: Observable<[KeyboardEvent]>;

    constructor() {
        this.init();
        this.$pauseKey = Observable.fromEvent(document, 'keydown');
    }

    private init() {
        this.canvas = new Canvas({
            selector: 'root'
        });
        if (this.players.length < 2 && this.players.length === 0) {
            this.players.push(new Player(this, false));
            this.players.push(new Player(this, true));
        }
        this.ball = new Ball(this);
    }

    getPlayers(): Player[] {
        return this.players;
    }

    getContext() {
        return this.canvas.getContext();
    }

    getCanvasSize(): Interface.Size {
        return {
            height: this.canvas.canvasSize.height,
            width: this.canvas.canvasSize.width
        };
    }
}
