import { Observable } from 'rxjs';
import * as Interface from './interfaces';
import Game from './Game';

export default class Player {
    private existingPlayers: Player[];
    private context: any;
    private timeStamp: number;
    public RECWIDTH: number = 100;
    public RECHEIGHT: number = 20;
    public position: Interface.Position = {
        x: 0,
        y: 0
    };
    static PLAYER_MARGIN: number = 100;
    private speed: number = 0;
    private direction: string;
    private game: Game;
    private keysState: {[key: string]: boolean} = {};

    constructor (game: Game, isHuman: boolean) {
        this.existingPlayers = game.getPlayers();
        this.context = game.getContext();
        this.game = game;
        this.move = this.move.bind(this);
        this.position.x = window.innerWidth / 2 - this.RECWIDTH / 2;
        this.position.y = window.innerHeight - 100;
        this.init();
    }

    private init() {
        const that: Player = this;
        this.context.fillRect(this.position.x, this.position.y, this.RECWIDTH, this.RECHEIGHT);
        const $keyDown = Observable.fromEvent(document, 'keydown');
        const $keyUp = Observable.fromEvent(document, 'keyup');
        this.move(1000);
        $keyDown.subscribe((e: KeyboardEvent) => {
            const speed = 5;
            that.timeStamp = performance.now();
            this.keysState[e.keyCode || e.which] = true;
            switch (e.which || e.keyCode) {
            case 37: // left
                this.direction = 'left';
                this.speed = speed;
                break;
            case 39: // right
                this.direction = 'right';
                this.speed = -speed;
                break;
            default: return;
            }
        });
        $keyUp.subscribe((e: KeyboardEvent) => {
            that.timeStamp = performance.now();
            this.speed = 0;
            this.keysState[e.keyCode || e.which] = false;
        });
    }

    private render(position: Interface.Position) {
        const player = this;
        function reDraw(x: number) {
            player.context.fillRect(x, position.y, player.RECWIDTH, player.RECHEIGHT);
        }
        if (position.x > this.RECWIDTH / 2 && position.x < window.innerWidth - this.RECWIDTH * 2) {
            reDraw(position.x);
            this.position = position;
        } else if (position.x < this.RECWIDTH / 2) {
            reDraw(this.RECWIDTH / 2);
        } else if (position.x > window.innerWidth - this.RECWIDTH * 2) {
            reDraw(window.innerWidth - this.RECWIDTH * 2);
        }
    }

    move(e: number) {
        const canvasSize = this.game.getCanvasSize();
        this.context.clearRect(
            0, 0,
            canvasSize.width, canvasSize.height
        );
        this.render({
            x: this.position.x - this.speed,
            y: this.position.y
        });
        requestAnimationFrame(this.move);
    }
}
