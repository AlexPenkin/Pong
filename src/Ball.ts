import { Observable} from 'rxjs';
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
    private speed: number = 15;

    constructor (game: Game) {
        this.game = game;
        this.context = game.getContext();
        this.move = this.move.bind(this);
        this.position = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        }
        this.render(this.position);
        this.move(0);
    }

    render (position : Interface.Position) {
        this.context.beginPath();
        this.context.arc(position.x, position.y, this.radius, 0, 2*Math.PI);
        this.context.stroke();
        this.context.closePath();
        this.context.fillStyle = this.ballColor;
        this.context.fill();
    }

    clear() {
        this.context.save();
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, this.radius + 1, 0, 2*Math.PI, true);
        this.context.clip();
        this.context.clearRect(this.position.x - 1 - this.radius, this.position.y - 1 - this.radius, this.radius*2 + 2, this.radius*2 + 2);
        this.context.restore();
    }

    move (e: number) {
        if (this.game.getPlayers()[0].position.y > this.position.y + this.radius + this.speed && 100 < this.position.y + this.radius + this.speed) {
            this.clear();
            this.position.y += this.speed;
            // this.position.x += 2;
            this.render(this.position);
            requestAnimationFrame(this.move);
        } else {
            this.speed = -this.speed;
               this.clear();
            this.position.y += this.speed;
            // this.position.x += 2;
            this.render(this.position);
            requestAnimationFrame(this.move);
        }
    }
}