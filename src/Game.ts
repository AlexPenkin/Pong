import { Observable } from 'rxjs';
import * as Interface from './interfaces';
import Canvas from './Canvas';
import Player from './Player';
import Ball from './Ball';

export default class Game {
    private canvas: Canvas;
    private players: Player[] = [];
    public ball: Ball;
    private pause: boolean = true;
    private $pauseKey: Observable<[KeyboardEvent]>;
    public difficulty: number = 1;
    public score: HTMLElement;
    public playerName:HTMLElement;
    public playerScore:HTMLElement;
    public compScore:HTMLElement;

    constructor() {
        this.init();
        this.$pauseKey = Observable.fromEvent(document, 'keydown');
    }

    private init() {
        this.canvas = new Canvas({
            selector: 'root'
        });
        this.initializeScore();
        if (this.players.length < 2 && this.players.length === 0) {
            this.players.push(new Player(this, true));
            this.players.push(new Player(this, false));
        }
        this.ball = new Ball(this);
    }

    initializeScore() {
        const body: HTMLElement = document.getElementsByTagName('body')[0];
        const header: HTMLElement = document.createElement('h1');
        this.score = document.createElement('div');
        this.score.style.width = '250px';
        this.score.style.paddingBottom = '20px';
        this.score.style.border = '1px solid black';
        this.score.style.cssFloat = 'right';
        header.style.textAlign = 'center';
        header.innerHTML = 'SCORE';
        this.score.appendChild(header);
        body.appendChild(this.score);
        this.initializePlayerScore();
        this.initializeCompScore();
    }

    setPlayerName(name: string) {
        this.playerName.innerHTML = name;
    }

    public setScore(elem: HTMLElement, score: number) {
        elem.innerHTML = score + '';
    }

    public resetScore() {
        this.setScore(this.playerScore, 0);
        this.setScore(this.compScore, 0);
    }

    getScore(elem: HTMLElement): number {
        return parseInt(elem.innerHTML, 10);
    }

    initializePlayerScore() {
        const playerDiv: HTMLElement = document.createElement('div');
        playerDiv.style.textAlign = 'center';
        playerDiv.style.marginBottom = '10px';
        this.playerName = document.createElement('h1');
        this.setPlayerName('Player: ');
        this.playerScore = document.createElement('h1');
        this.playerName.style.display = this.playerScore.style.display = 'inline';
        this.setScore(this.playerScore, 0);
        playerDiv.appendChild(this.playerName);
        playerDiv.appendChild(this.playerScore);
        this.score.appendChild(playerDiv);
    }

    initializeCompScore() {
        const compDiv: HTMLElement = document.createElement('div');
        compDiv.style.textAlign = 'center';
        const compName = document.createElement('h1');
        compName.innerHTML = 'Computer: ';
        this.compScore = document.createElement('h1');
        compName.style.display = this.compScore.style.display = 'inline';
        this.setScore(this.compScore, 0);
        compDiv.appendChild(compName);
        compDiv.appendChild(this.compScore);
        this.score.appendChild(compDiv);
    }

    getPlayers(): Player[] {
        return this.players;
    }

    getContext() {
        return this.canvas.getContext();
    }

    getCanvasSize(): Interface.Size {
        return {
            height: this.canvas.canvasSize.height,
            width: this.canvas.canvasSize.width
        };
    }
}
