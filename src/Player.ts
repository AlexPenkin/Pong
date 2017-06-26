import { Observable} from 'rxjs';
import * as Interface from './interfaces';
import Game from './Game';

export default class Player {
    existingPlayers: Player[];
    private context: any;
    private timeStamp: number;
    public RECWIDTH: number = 100;
    public RECHEIGHT: number = 20;
    public position: Interface.Position = {
        x: 0,
        y: 0
    };
    private keysState = {};

    constructor (game: Game, isHuman: boolean) {
        this.existingPlayers = game.getPlayers();
        this.context = game.getContext();
        this.moveRight = this.moveRight.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.position.x = window.innerWidth / 2 - this.RECWIDTH;
        this.position.y = window.innerHeight - 100;
        this.init();
    }

    private init() {
        const that: Player = this;
        this.context.fillRect(this.position.x, this.position.y, this.RECWIDTH, this.RECHEIGHT);
        let $keyDown = Observable.fromEvent(document, 'keydown');
        let $keyUp = Observable.fromEvent(document, 'keyup');
        $keyDown.throttleTime(10).subscribe((e: KeyboardEvent) => {
            that.timeStamp = performance.now();
            this.keysState[e.keyCode || e.which] = true;
            switch(e.which || e.keyCode) {
                case 37: // left
                that.moveLeft(that.position.x);
                break;

                case 39: // right
                that.moveRight(that.position.x);
                break;
                default: return;
            }
        });
        $keyUp.throttleTime(10).subscribe((e: KeyboardEvent) => {
            that.timeStamp = performance.now();
            this.keysState[e.keyCode || e.which] = false;
        });
    }

    private render(position: Interface.Position) {
        const player = this;
        function reDraw(x: number) {
            player.context.clearRect(player.position.x - 1, player.position.y - 1, player.RECWIDTH + 2, player.RECHEIGHT + 2)
            player.context.fillRect(x, position.y, player.RECWIDTH, player.RECHEIGHT);
        }
        if (position.x > this.RECWIDTH / 2 && position.x < window.innerWidth - this.RECWIDTH * 2) {
            reDraw(position.x)
            this.position = position;
        } else if (position.x < this.RECWIDTH / 2) {
            reDraw(this.RECWIDTH / 2);
        } else if (position.x > window.innerWidth - this.RECWIDTH * 2) {
            reDraw(window.innerWidth - this.RECWIDTH * 2);
        }
    }

    moveRight(e: number) {
        if (this.keysState[39]) {
            const timeNow = Date.now();
            if(!e || e - this.timeStamp < 130) {
                if(!e) e = this.position.x;
                this.render({
                    x: this.position.x + 1,
                    y: this.position.y
                })
                requestAnimationFrame(this.moveRight);
            }
        }
    }

    moveLeft(e: number) {
        if (this.keysState[37]) {
            const timeNow = Date.now();
            if (!e || e - this.timeStamp < 130) {
                if (!e) e = this.position.x;
                this.render({
                    x: this.position.x - 1,
                    y: this.position.y
                })
                requestAnimationFrame(this.moveLeft);
            }
        }
    };
}
