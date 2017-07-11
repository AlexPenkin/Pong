import { Observable } from 'rxjs';
import * as Interface from './interfaces';
import Game from './Game';

export default class Player {
    public name: string;
    private existingPlayers: Player[];
    private context: any;
    private timeStamp: number;
    public RECWIDTH: number = 100;
    public RECHEIGHT: number = 20;
    static PLAYER_MARGIN = 100;
    public position: Interface.Position = {
        x: 0,
        y: 0
    };
    static PLAYER_MARGIN: number = 50;
    private speed: number = 0;
    private direction: string;
    private keysState = {};
    private game: Game;
    public traction: number = 1;
    public isHuman: boolean;
    private keysState: boolean;
    private diff: number;

    constructor (game: Game, isHuman: boolean) {
        this.context = game.getContext();
        this.render = this.render.bind(this);
        this.game = game;
        this.isHuman = isHuman;
        this.name = (isHuman) ? 'Player1' : 'AI';
        this.move = this.move.bind(this);
        this.position.x = window.innerWidth / 2 - this.RECWIDTH / 2;
        if (isHuman) {
            this.position.y = window.innerHeight - Player.PLAYER_MARGIN;
        } else {
            this.position.y = window.innerHeight - (window.innerHeight - Player.PLAYER_MARGIN);
        }
        this.init();
    }

    private init(): void {
        this.render();
        this.move();
        if (this.isHuman) {
            const $keyDown = Observable.fromEvent(document, 'keydown');
            const $keyUp = Observable.fromEvent(document, 'keyup');
            $keyDown.subscribe((e: KeyboardEvent) => {
                const SPEED = 10;
                this.keysState = true;
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
                this.speed = 0;
                this.keysState = false;
                this.direction = 'none';
            });
        }
    }

    setInitialPosition(): void {
        const canvasHeight = this.game.getCanvasSize();
        this.position.x = canvasHeight.width / 2 - this.RECWIDTH / 2;
        this.speed = 0;
        if (this.isHuman) {
            this.position.y = canvasHeight.height - Player.PLAYER_MARGIN;
        } else {
            this.position.y = canvasHeight.height - (canvasHeight.height - Player.PLAYER_MARGIN);
        }
    }

    reDraw(x: number) {
        this.context.fillRect(x, this.position.y, this.RECWIDTH, this.RECHEIGHT);
    }

    private render(e?: number): void {
        this.ai();
        if (this.position.x > this.RECWIDTH / 2 &&
            this.position.x < window.innerWidth - this.RECWIDTH * 2) {
            this.reDraw(this.position.x);
            // detection left out
        } else if (this.position.x < 0) {
            this.reDraw(0);
            // detection right out
        } else if (this.position.x > window.innerWidth - this.RECWIDTH * 1.5) {
            this.reDraw(window.innerWidth - this.RECWIDTH * 1.5);
        } else {
            this.reDraw(this.position.x);
        }
        requestAnimationFrame(this.render);
    }

    ai(): string {
        if (!this.isHuman && this.game.ball) {
            const SPEED = 1;
            const ballPosition = this.game.ball.getPosition().x + this.game.ball.radius;
            const posistionDiffirence = this.position.x + this.RECWIDTH / 2 - ballPosition;
            if (posistionDiffirence > this.game.ball.radius ||
                posistionDiffirence < -this.game.ball.radius
            ) {
                if (this.position.x + this.RECWIDTH / 2 <= ballPosition) {
                    this.speed = -SPEED;
                } else {
                    this.speed = SPEED;
                }
            } else {
                this.speed = 0;
            }
            this.diff = this.position.x - this.speed;
            if (this.speed !== 0) {
                this.move();
            }
        } else {
            return 'Is not human';
        }
    }

    move(e?: number): void {
        if (this.keysState && this.speed) {
            this.position.x -= this.speed;
            requestAnimationFrame(this.move);
        } else {
            if (this.diff !== this.position.x) {
                // console.log(this.speed);
                this.position.x -= this.speed;
                requestAnimationFrame(this.move);
            } else {
                return;
            }
        }
        return;
    }
}
