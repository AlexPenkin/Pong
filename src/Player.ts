import * as Interface from './interfaces';
import Game from './Game';
export default class Player {
    existingPlayers: Player[];
    private context: any;
    private RECWIDTH: number = 100;
    private RECHEIGHT: number = 20;
    constructor (game: Game, type: string) {
        this.existingPlayers = game.getPlayers();
        this.context = game.getContext();
        this.init();
    }

    private init() {
        const that: Player = this;
        this.context.fillRect(window.innerWidth / 2 - this.RECWIDTH, window.innerHeight - 100, this.RECWIDTH, this.RECHEIGHT);
        document.onkeydown = function(e: KeyboardEvent) {
            switch(e.which || e.keyCode) {
                case 37: // left
                that.moveLeft();
                break;

                case 39: // right
                that.moveRight();
                break;
                default: return;
            }
        }
    }

    moveRight() {
        console.log('right');
    }

    moveLeft() {
        console.log('left');
    }
}