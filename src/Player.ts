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
    public position: Interface.Position = {
        x: 0,
        y: 0
    };
    static PLAYER_MARGIN: number = 50;
    private speed: number = 0;
    public direction: string;
    private game: Game;
    public traction: number = 1;
    public isHuman: boolean;
    private keysState: boolean;

    constructor(game: Game, isHuman: boolean) {
        this.existingPlayers = game.getPlayers();
        this.context = game.getContext();
        this.render = this.render.bind(this);
        this.ai = this.ai.bind(this);
        this.game = game;
        this.isHuman = isHuman;
        this.name = (isHuman) ? 'Player1' : 'AI';
        this.move = this.move.bind(this);
        this.setInitialPosition();
        this.init();
    }

    private init(): void {
        this.render();
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
        const canvasWidth = this.game.getCanvasSize().width;
        if (this.position.x > this.RECWIDTH / 2 &&
            this.position.x < canvasWidth - this.RECWIDTH * 2) {
            this.reDraw(this.position.x);
            // detection left out
        } else if (this.position.x < 0) {
            this.reDraw(0);
            // detection right out
        } else if (this.position.x > canvasWidth - this.RECWIDTH) {
            this.reDraw(canvasWidth - this.RECWIDTH);
        } else {
            this.reDraw(this.position.x);
        }
        this.move();
        requestAnimationFrame(this.render);
    }

    getBallPosition() {
        return this.game.ball.getPosition().x;
    }

    getDiffirenceWithPlayerAndBall() {
        const ballPosition = this.getBallPosition();
        const posistionDiffirence = this.position.x + this.RECWIDTH / 2 - ballPosition;
        return posistionDiffirence;
    }

    ai(): string {
        if (!this.isHuman && this.game.ball) {
            const range = 10;
            const speed = -1;
            const posistionDiffirence = this.getDiffirenceWithPlayerAndBall();
            if (posistionDiffirence > this.game.ball.radius ||
                posistionDiffirence < -this.game.ball.radius
            ) {
                if (this.position.x + this.RECWIDTH / 2 <= this.getBallPosition()) {
                    this.speed = -range;
                } else {
                    this.speed = range;
                }
            } else {
                this.speed = 0;
            }
            if (posistionDiffirence < range) {
                this.position.x -= speed;
                requestAnimationFrame(this.ai);
            }
            if (posistionDiffirence > range) {
                this.position.x += speed;
                requestAnimationFrame(this.ai);
            }
        } else {
            return 'Is not human';
        }
    }

    move(e?: number): void {
        if (this.isHuman) {
            this.position.x -= this.speed;
        }
        return;
    }
}
