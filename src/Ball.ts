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
    private speed: any = { x: 0, y: 5 };
    public isMoving: boolean = false;
    public traction: number = 1;
    public players: Player[];

    constructor (game: Game) {
        this.game = game;
        this.context = game.getContext();
        this.move = this.move.bind(this);
        this.setInitialPosition();
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

    setInitialPosition() {
        this.position = this.getInitialPosition();
        this.speed.x = 0;
    }

    draw(position : Interface.Position) {
        this.context.beginPath();
        this.context.arc(position.x, position.y, this.radius, 0, 2 * Math.PI);
        this.context.closePath();
        this.context.fillStyle = this.ballColor;
        this.context.fill();
    }

    render() {
        this.position.y += this.speed.y;
        this.position.x += this.speed.x;
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
        },                                     false);
        if (isCollided) {
            const acceleration = 6;
            if (this.speed.x < acceleration && this.speed.x > -acceleration) {
                if (this.players[0].direction === 'left') {
                    this.speed.x += acceleration;
                } else if (this.players[0].direction === 'right') {
                    this.speed.x += -acceleration;
                } else {
                    this.speed.x += 0;
                }
            } else if (this.players[0].direction === 'right' && this.speed.x >= acceleration) {
                this.speed.x = 0;
            } else if (this.players[0].direction === 'left' && this.speed.x <= -acceleration) {
                this.speed.x = 0;
            }
        }
        return isCollided;
    }

    sideBorderDetection() {
        const sideCollided = this.position.x - this.radius / 2 < this.players[0].RECWIDTH / 2 ||
            this.position.x + this.radius / 2 >
            this.game.getCanvasSize().width  - this.players[0].RECWIDTH / 2;
        return sideCollided;
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
        },                                     false);
        return isCollided;
    }

    move (e: number) {
        const predicateForNormalMoving =
            Player.PLAYER_MARGIN < this.position.y + this.radius;

        if (this.goalDetection()) {
            alert('goal');
            this.render();
            this.game.allMoveToInitialPosition();
        }

        if (this.sideBorderDetection()) {
            this.speed.x = -this.speed.x;
        }

        if (this.playerCollisionDetection()) {
            this.speed.y = -this.speed.y;
            this.render();
            requestAnimationFrame(this.move);
        } else if (predicateForNormalMoving) {
            this.render();
            requestAnimationFrame(this.move);
        } else {
            this.speed.y = -this.speed.y;
            this.render();
            requestAnimationFrame(this.move);
        }
    }
}
