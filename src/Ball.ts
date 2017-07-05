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
    private radius: number = 10;
    private ballColor = 'black';
    private game: Game;
    private speed: number = 10;
    public isMoving: boolean = false;
    public traction: number = 1;
    public players: Player[];

    constructor (game: Game) {
        this.game = game;
        this.context = game.getContext();
        this.move = this.move.bind(this);
        this.position = this.getInitialPosition();
        this.players = this.game.getPlayers();
        this.init();
    }

    init() {
        this.draw(this.position);
        setTimeout(() => {this.move(0);}, 0);
    }

    getInitialPosition() {
        return {
            x: window.innerWidth / 2,
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

    playerCollisionDetection() {
        const isCollided = this.players.reduce((previousPlayer, curr) => {
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

    sideBorderDetection() {
        const sideCollided = this.position.x - this.radius / 2 < 0 ||
            this.position.x + this.radius / 2 > this.game.getCanvasSize().width;
    }

    goalDetection() {
        const isCollided = this.players.reduce((previousPlayer, curr) => {
            return (
                (this.position.y + this.radius >= curr.position.y &&
                    this.position.y - this.radius <= curr.position.y + curr.RECHEIGHT
                ) && !(
                    this.position.x + this.radius >= curr.position.x &&
                    this.position.x - this.radius <= curr.position.x + curr.RECWIDTH
                )) || previousPlayer;
        }, false);
        return isCollided;
    }

    move (e: number) {
        const predicateForNormalMoving =
            Player.PLAYER_MARGIN < this.position.y + this.radius;

        if (this.goalDetection()) {
            alert('goal');
            this.render(false);
        }

        if (this.sideBorderDetection()) {
            this.position.x = -this.position.x;
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
