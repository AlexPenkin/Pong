import * as Interface from './interfaces';
import Canvas from './Canvas';
import Player from './Player';
import Ball from './Ball';

export default class Game {
    private canvas: Canvas;
    private players: Player[] = [];
    private pause: boolean = true;

    constructor() {
        this.init();
    }

    private init() {
        this.canvas = new Canvas({
            selector: 'root'
        });
        if (this.players.length < 2 && this.players.length === 0) {
            this.players.push(new Player(this, true));
        }
        new Ball(this);
    }

    getPlayers() {
        return this.players;
    }

    getContext() {
        return this.canvas.getContext();
    }
}