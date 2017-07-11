import { Observable } from 'rxjs';
import * as Interface from './interfaces';
import Game from './Game';
import Player from './Player';

export default class Ball {
    public position: Interface.Position = {
        x: 0,
        y: 0
    };
    private context: any;
    public radius: number = 10;
    private ballColor = 'black';
    private game: Game;
    private speed: any = { x: 5, y: 10 };
    public isMoving: boolean = false;

    constructor (game: Game) {
        this.game = game;
        this.context = game.getContext();
        this.move = this.move.bind(this);
        this.position = this.getInitialPosition();
        this.init();
    }

    init() {
        this.draw(this.position);
        setTimeout(() => {this.move(0);}, 0);
    }

    getInitialPosition() {
        const canvasSize = this.game.getCanvasSize();
        return {
            x: canvasSize.width / 2,
            y: window.innerHeight / 2
        };
    }

    draw(position : Interface.Position) {
        this.context.beginPath();
        this.context.arc(position.x, position.y, this.radius, 0, 2 * Math.PI);
        this.context.closePath();
        this.context.fillStyle = this.ballColor;
        this.context.fill();
    }

    render(out?: boolean) {
        if  (out) {
            this.speed = -this.speed;
        }

        this.position.y += this.speed;

        // this.position.x += 2;
        this.draw(this.position);
    }

    getPosition(): Interface.Position {
        return {
            x: this.position.x,
            y: this.position.y
        };
    }

    playerCollisionDetection() {
        const players: Player[] = this.game.getPlayers();
        const isCollided = players.reduce((previousPlayer, curr) => {
            return (
                (this.position.y + this.radius >= curr.position.y &&
                    this.position.y - this.radius <= curr.position.y + curr.RECHEIGHT
            ) && (
                this.position.x + this.radius >= curr.position.x &&
                    this.position.x - this.radius <= curr.position.x + curr.RECWIDTH
            )) || previousPlayer;
        }, false);
        return isCollided;
    }

    goalDetection() {
        const isCollided = this.players.reduce((prev, curr) => {
            const predicate = (
                (this.position.y + this.radius >= curr.position.y &&
                    this.position.y - this.radius <= curr.position.y + curr.RECHEIGHT
                ) && !(
                    this.position.x + this.radius >= curr.position.x &&
                    this.position.x - this.radius <= curr.position.x + curr.RECWIDTH
            ));
            if (predicate === true) {
                if (!curr.isHuman) {

                    this.game.setScore(
                        this.game.playerScore,
                        this.game.getScore(this.game.playerScore) + 1
                    );
                } else {
                    this.game.setScore(
                        this.game.compScore,
                        this.game.getScore(this.game.compScore) + 1
                    );
                }
            }
            return predicate || prev;
        },                                     false);
        return isCollided;
    }

    move (e: number) {
        const predicateForNormalMoving =
            Player.PLAYER_MARGIN < this.position.y + this.radius;

        if (this.goalDetection()) {
            this.render();
            this.game.allMoveToInitialPosition();
        }

        if (this.sideBorderDetection()) {
            this.speed.x = -this.speed.x;
        }

        if (this.playerCollisionDetection()) {
            this.render(true);
            requestAnimationFrame(this.move);
        } else if (predicateForNormalMoving) {
            this.render();
            requestAnimationFrame(this.move);
        } else {
            this.render(true);
            requestAnimationFrame(this.move);
        }
    }
}
