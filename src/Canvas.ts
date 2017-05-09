import * as Interface from './interfaces';
export default class Canvas {
    canvasSelector: string;
    canvasSize: Interface.Size;
    private canvas: any;
    private context: any;   
    constructor(settings: Interface.CanvasSettings) {
        this.canvasSelector= settings.selector;
        this.canvasSize = settings.size;
        this.init(settings);
    }

    setSize (size: Interface.Size) {
        if (size && size.height && size.width) {
            this.canvas.height = size.width;
            this.canvas.width = size.height;
        } else if (size && size.width) {
            this.canvas.height = window.innerHeight - 50;
            this.canvas.width = size.width;
        } else if (size && size.height){
            this.canvas.height = size.height;
            this.canvas.width = window.innerWidth - 50;
        } else {
            this.canvas.height = window.innerHeight - 50;
            this.canvas.width = window.innerWidth - 50;
        }
    }

    init(settings: Interface.CanvasSettings) {
        const selector = settings.selector || 'root';
        this.canvas = document.getElementById(selector);
        this.context = this.canvas.getContext('2d');
        this.setSize(settings.size);
    }
    
    getContext() {
        return this.context;
    }

    getCanvas() {
        return this.canvas;
    }
};