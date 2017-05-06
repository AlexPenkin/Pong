function clock() {
    const Cansvas = (settings) => {
        let canvasSelector;
        let canvasSize;
        if (settings && settings.canvasSelector) {
            canvasSelector = settings.selector;
        } else {
            canvasSelector = 'root';
        }

        if (settings && settings.height && settings.width) {
            canvasSize = settings.canvasSize;
        } else {
            canvasSize = { width: window.innerWidth - 50, height: window.innerHeight - 50 };
        }

        const canvas = document.getElementById('root');
        const context = canvas.getContext('2d');
        context.setSize = function (width, height) {
            console.log(this.height);
            this.canvas.height = window.innerHeight - 50;
            this.canvas.width = window.innerWidth - 50;
            this.color = 'red';
        };
        return context;
    };

//     class Canvas {
//     constructor(settings) {
//    }
// }

    class Player {
        constructor(context, type) {
            this.context = context;
            this.canvasWidth = this.context.canvas.width;
            this.canvasHeight = this.context.canvas.height;
            this.x = (this.canvasWidth / 2) - 50;
            this.y = this.canvasHeight - 36;
            this.move = this.move.bind(this);
        // implemrnt type
        }
        drawPlayer(x, y) {
            // let one = 1;
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            // if (this.x > this.canvasWidth || this.x < 0) {
            //     one = one > 0 ? -1 : 1;
            // }
            this.context.fillRect(this.x, this.y, 100, 18);
            this.context.fillRect(this.x, this.y, 100, 18);
        }

        move(time) {
            const timePassed = time - this.start;
            this.x += 1;
            this.drawPlayer();
            console.log(timePassed);
            console.log(this.x);
            if (timePassed < 1000) {
                requestAnimationFrame(this.move);
            }
        }
}

    console.log('Script load properly');
    const canvas = Cansvas();
    canvas.setSize();
    const player = new Player(canvas);

    window.addEventListener('resize', () => {
        canvas.setSize();
        player.drawPlayer();
    });

    window.addEventListener('click', () => {
        player.start = performance.now();
        player.move(1);
    });

    player.drawPlayer();
    // window.requestAnimationFrame(clock);
}
clock();
