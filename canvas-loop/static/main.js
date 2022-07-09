// FPS
var tmark = 0;
var tdiffSum = 0;
var tmarkCount = 0;

// canvas
var canvas;
var ctx;

// state
var cellSize;
var padding;
var world = [
    [0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 1, 0],
];

function init() {
    canvas = document.getElementById('solar')
    ctx = canvas.getContext('2d');
    cellSize = 20; // px
    padding = 2; // px

    // render loop
    window.requestAnimationFrame(renderLoop);

    // logic update loop
    setInterval(function () {
        worldTick();
    }, 200);
}

function worldTick() {
    for (let i = 0; i < world.length; i++) {
        for (let j = 0; j < world[i].length; j++) {
            world[i][j] = Math.floor(Math.random() * 2)
        }
    }
}

function renderLoop(now) {
    const tdiff = (now - tmark);
    tdiffSum += tdiff;
    tmarkCount += 1;
    if (tmarkCount > 10) {
        const frameTime = tdiffSum / tmarkCount;
        const fps = (1000 / frameTime);

        document.getElementById("frame-time").innerHTML = frameTime.toFixed(2);
        document.getElementById("fps").innerHTML = fps.toFixed(2);
        tmarkCount = 0;
        tdiffSum = 0;
    }
    tmark = now;


    for (let i = 0; i < world.length; i++) {
        for (let j = 0; j < world[i].length; j++) {
            const element = world[i][j];

            const x = (j * cellSize);
            const y = (i * cellSize);
            console.log(x, y, element)

            if (element === 1) {
                ctx.fillStyle = '#00c800';
            } else {
                ctx.fillStyle = '#000000';
            }

            drawCellAt(ctx, x, y, cellSize - padding);
        }
    }
    // keep rendering going
    window.requestAnimationFrame(renderLoop)
}

function drawCellAt(ctx, x, y, size) {
    ctx.fillRect(x, y, size, size);
}




