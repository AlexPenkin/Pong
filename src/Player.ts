import { Observable} from 'rxjs';
import * as Interface from './interfaces';
import Game from './Game';

export default class Player {
    existingPlayers: Player[];
    private context: any;
    private timeStamp: number;
    private RECWIDTH: number = 100;
    private RECHEIGHT: number = 20;
    public position: Interface.Position = {
        x: 0,
        y: 0
    };

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
        let $key = Observable.fromEvent(document, 'keydown');
        $key.throttleTime(10).subscribe((e: KeyboardEvent) => {
              e.preventDefault();
            that.timeStamp = performance.now();
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

    moveLeft(e: number) {
        const timeNow = Date.now();
        if (!e || e - this.timeStamp < 130) {
            if (!e) e = this.position.x;
            this.render({
                x: this.position.x - 1,
                y: this.position.y
            })
            requestAnimationFrame(this.moveLeft);
        }
    };
}
