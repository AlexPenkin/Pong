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
    public direction: string;
    private game: Game;
    public traction: number = 1;
    public isHuman: boolean;
    private keysState: {[key: string]: boolean} = {};

    constructor (game: Game, isHuman: boolean) {
        this.existingPlayers = game.getPlayers();
        this.context = game.getContext();
        this.game = game;
        this.isHuman = isHuman;
        this.move = this.move.bind(this);
        this.setInitialPosition();
        this.init();
    }

    private init(): void {
        this.context.fillRect(this.position.x, this.position.y, this.RECWIDTH, this.RECHEIGHT);
        this.move(1000);
        if (this.isHuman) {
            const $keyDown = Observable.fromEvent(document, 'keydown');
            const $keyUp = Observable.fromEvent(document, 'keyup');
            this.move(1000);
            $keyDown.subscribe((e: KeyboardEvent) => {
                const SPEED = 10;
                this.timeStamp = performance.now();
                this.keysState[e.keyCode || e.which] = true;
                switch (e.which || e.keyCode) {
                case 37: // left arrow key
                    this.direction = 'left';
                    this.speed = SPEED;
                    break;
                case 39: // right arrow key
                    this.direction = 'right';
                    this.speed = -SPEED;
                    break;
                default: return;
                }
            });
            $keyUp.subscribe((e: KeyboardEvent) => {
                this.timeStamp = performance.now();
                this.speed = 0;
                this.keysState[e.keyCode || e.which] = false;
                this.direction = 'none';
            });
        }
    }

    setInitialPosition(): void {
        this.position.x = window.innerWidth / 2 - this.RECWIDTH / 2;
        this.speed = 0;
        if (this.isHuman) {
            this.position.y = window.innerHeight - Player.PLAYER_MARGIN;
        } else {
            this.position.y = window.innerHeight - (window.innerHeight - Player.PLAYER_MARGIN);
        }
    }

    private render(position: Interface.Position): void {
        // tslint:disable-next-line:no-var-self
        const player = this;
        this.ai();
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
        } else {
            reDraw(this.position.x);
        }
    }

    ai(): string {
        if (!this.isHuman && this.game.ball) {
            const ballPosition = this.game.ball.getPosition().x + this.game.ball.radius;
            const posistionDiffirence = this.position.x + this.RECWIDTH / 2 - ballPosition;
            // console.log(this.position.x + this.RECWIDTH / 2);
            // console.log(ballPosition);
            if (posistionDiffirence > this.game.ball.radius ||
                posistionDiffirence < -this.game.ball.radius
            ) {
                if (this.position.x + this.RECWIDTH / 2 < ballPosition) {
                    this.speed = -10;
                } else {
                    this.speed = 10;
                }
                return 'AI done his work';
            } else {
                this.speed = 0;
            }
        } else {
            return 'Is not human';
        }
    }

    move(e: number): void {
        this.render({
            x: this.position.x - this.speed,
            y: this.position.y
        });
        requestAnimationFrame(this.move);
    }
}
