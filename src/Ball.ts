import { Observable } from 'rxjs';
import * as Interface from './interfaces';
import Game from './Game';

export default class Ball {
    public position: Interface.Position = {
        x: 0,
        y: 0
    };
    private context: any;
    private radius: number = 10;
    private ballColor = 'black';
    private game: Game;
    private speed: number = 10 / this.radius;
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

    clear() {
        const clearingRadius = this.radius + 3;
        this.context.save();
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, clearingRadius, 0, 2 * Math.PI, true);
        this.context.clip();
        this.context.clearRect(
            this.position.x - this.radius,
            this.position.y - this.radius - 3,
            this.radius * 2 + 5, this.radius * 2 + 5
        );
        this.context.restore();
    }

    render(out?: boolean, position?: Interface.Position) {

        if  (out) {
            this.speed = -this.speed;
        }

        this.clear();
        if (position) {
            this.position = position;
        } else {
            this.position.y += this.speed;
        }
        // this.position.x += 2;
        this.draw(this.position);
    }

    move (e: number) {
        const playerOne =  this.game.getPlayers()[0];

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

        if (predicateForCollisionWithPlayer) {
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
