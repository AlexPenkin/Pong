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
    private speed: number = 0.21 * this.radius;
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
        const players: Player[] = this.game.getPlayers();
        const isCollided = players.reduce((previousPlayer, curr) => {
            return (
                (this.position.y + this.radius >= curr.position.y &&
                    this.position.y - this.radius <= curr.position.y + curr.RECHEIGHT
            )) || previousPlayer;
        }, false);
        return isCollided;
    }

    move (e: number) {
        const players = this.game.getPlayers();
        const playerOne: Player =  players[0];
        const playerTwo: Player = players[1];

        const predicateForNormalMoving =
            100 < this.position.y + this.radius;

        const predicateForCollisionWithPlayer =
            playerOne.position.y <= this.position.y + this.radius &&
            playerOne.position.x <= this.position.x + this.radius &&
            playerOne.position.x + playerOne.RECWIDTH >= this.position.x;

        const predicateForGoal =
            playerOne.position.y <= this.position.y + this.radius &&
            (playerOne.position.x > this.position.x + this.radius ||
            playerOne.position.x + playerOne.RECWIDTH < this.position.x);

        if (predicateForGoal) {
            alert('goal');
            this.render(false, this.getInitialPosition());
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
