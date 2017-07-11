import * as Interface from './interfaces';
export default class Canvas {
    public canvasSelector: string;
    public canvasSize: Interface.Size;
    private canvas: any;
    private context: any;
    public margin: number = 25;
    constructor(settings: Interface.CanvasSettings) {
        this.canvasSelector = settings.selector;
        this.clear = this.clear.bind(this);
        this.canvasSize = settings.size || {
            height: window.innerHeight - 50,
            width: window.innerWidth - 325
        };
        this.init(settings);
    }

    setSize (size: Interface.Size) {
        if (size && size.height && size.width) {
            this.canvas.height = size.width;
            this.canvas.width = size.height;
        } else if (size && size.width) {
            this.canvas.height = this.canvasSize.height;
            this.canvas.width = size.width;
        } else if (size && size.height) {
            this.canvas.height = size.height;
            this.canvas.width = this.canvasSize.width;
        } else {
            this.canvas.height = this.canvasSize.height;
            this.canvas.width = this.canvasSize.width;
        }
    }

    init(settings: Interface.CanvasSettings) {
        const body: HTMLElement = document.getElementsByTagName('body')[0];
        const canvasEl: HTMLElement = document.createElement('canvas');
        canvasEl.id = 'root';
        canvasEl.classList.add('root');
        body.appendChild(canvasEl);
        canvasEl.style.border = '1px solid black';
        body.style.textAlign = 'left';
        body.style.marginTop = `${this.margin}px`;
        body.style.marginLeft = `${this.margin}px`;
        body.style.marginRight = `${this.margin}px`;
        this.canvas = canvasEl;
        this.context = this.canvas.getContext('2d');
        this.setSize(settings.size);
        this.clear();
    }

    clear () {
        this.context.clearRect(
            0, 0,
            this.canvasSize.width, this.canvasSize.height
        );
        requestAnimationFrame(this.clear);
        return;
    }

    getContext() {
        return this.context;
    }

    getCanvas() {
        return this.canvas;
    }
}
