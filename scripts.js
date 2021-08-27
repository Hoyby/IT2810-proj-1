
//Toggle documentation
$(document).ready(function () {
    $("#toggleDocumentation").click(function () {
        $("#documentation").toggle();
    });
});

$("#documentation").hide();

//----------- Fourier series -------------
function fourier() {
    let canvas = $("#fourierCanvas").get(0);
    let ctx = canvas.getContext('2d')
    canvas.width = 1200;
    canvas.height = 400;

    // input field for setting degree
    $('#degree').val(3);
    let degree = $('#degree').val();

    function setDegree() {
        let val = $('#degree').val()
        if (val > 0 && val < 301)
            degree = val
    }

    fourier.setDegree = setDegree;

    let initRadius = 100
    let originY = canvas.height / 2 // center in middle
    let originX = initRadius * 3

    let time = 0
    let traceY = []


    function furierWave() {
        ctx.strokeStyle = 'rgba(255,255,255,0.5)'

        // delete trace if longer than maxTraceLen
        maxTraceLen = 800
        if (traceY.length > maxTraceLen) {
            traceY.pop()
        }

        //clearing canvas
        ctx.fillStyle = 'transparent'
        ctx.clearRect(0, 0, canvas.width, canvas.width);


        // let originX = initRadius + 200
        let x = originX
        let y = originY
        let lastX = originX
        let lastY = originY

        // ----- Circles and rotation -----
        for (let i = 0; i < degree; i++) {
            let n = (i * 2) + 1
            let radius = initRadius * (4 / (n * Math.PI))
            x += radius * Math.cos(n * time)
            y += radius * Math.sin(n * time)

            //drawing circles
            ctx.beginPath()
            ctx.arc(lastX, lastY, radius, 0, 2 * Math.PI)
            ctx.stroke()

            //drawing lines
            ctx.beginPath()
            ctx.moveTo(lastX, lastY)
            ctx.lineTo(x, y)
            ctx.stroke()

            //dot at end of line
            ctx.beginPath()
            ctx.fillStyle = 'white'
            ctx.arc(lastX, lastY, 2, 0, 2 * Math.PI)
            ctx.fill()

            //update values
            lastX = x
            lastY = y
        }
        traceY.unshift(y)

        // ----- Trace -----
        // drawing line
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(originX * 2, traceY[0])
        ctx.stroke()

        // trace line
        ctx.beginPath()
        ctx.strokeStyle = "white"
        ctx.moveTo(originX * 2, traceY[0])

        // ----- Trace -----
        for (let i = 0; i < traceY.length - 1; i++) {
            ctx.lineTo(originX * 2 + i, traceY[i])
        }
        ctx.stroke()

        time += 0.014
    }

    // animation interval
    setInterval(function () {
        furierWave()
    }, 16.66)
}

fourier()
//----------- Fourier series end ----------





//--------------- clickMe -----------------
function clickMe() {
    let hasNotRun = true;
    let canvas = $("#clickMeCanvas").get(0);
    let ctx = canvas.getContext('2d')
    canvas.width = 200;
    canvas.height = 200;

    let initRadius = 35
    let originX = canvas.width / 2 // center in middle
    let originY = canvas.height / 2
    let x = 0

    ctx.strokeStyle = 'rgba(255,255,255,0.7)'
    ctx.lineWidth = 2
    ctx.fillStyle = 'rgba(255,255,255,0.9)'

    // Init
    ctx.beginPath()
    ctx.arc(originX, originY, initRadius, 0, 2 * Math.PI)
    ctx.font = "16px Arial";
    ctx.fillText("Click me", originX - 30, originY + 5);
    ctx.stroke()

    function runClickAnimation() {
        if (hasNotRun) {
            ctx.clearRect(0, 0, canvas.width, canvas.width);


            ctx.strokeStyle = 'rgba(255,255,255,0.7)'
            ctx.lineWidth = 2
            ctx.fillStyle = 'rgba(255,255,255,0.9)'
            ctx.beginPath()
            let initCircleRadius = -0.01 * x ** 2 - 0.14 * x + initRadius
            if (initCircleRadius < 0) {
                initCircleRadius = 0
            }
            ctx.arc(originX, originY, initCircleRadius, 0, 2 * Math.PI)

            let fontSize = -0.005 * x ** 2 - 0.14 * x + 16
            console.log(fontSize);
            ctx.font = fontSize + "px Arial";
            ctx.fillText("Click me", 0.01 * x ** 2 + 0.14 * x + originX - 28, originY + 5);
            ctx.stroke()

            //drawing circles
            ctx.beginPath()
            ctx.arc(originX, originY, -0.01 * x ** 2 + 0.7 * x + initRadius, -1.57079, 0.09 * x - 1.6621)
            ctx.strokeStyle = '#DF4C54'
            ctx.stroke()

            ctx.beginPath()
            ctx.arc(originX, originY, -0.015 * x ** 2 + 1.2 * x + initRadius, -1.57079, 0.08 * x - 1.6621)
            ctx.strokeStyle = '#DF4C54'
            ctx.stroke()

            ctx.beginPath()
            ctx.arc(originX, originY, -0.02 * x ** 2 + 1.7 * x + initRadius, -1.57079, 0.07 * x - 1.6621)
            ctx.strokeStyle = '#50505C'
            ctx.stroke()

            ctx.beginPath()
            ctx.arc(originX, originY, -0.025 * x ** 2 + 2.2 * x + initRadius, -1.57079, 0.06 * x - 1.6621)
            ctx.strokeStyle = '#50505C'
            ctx.stroke()

            ctx.beginPath()
            ctx.arc(originX, originY, -0.03 * x ** 2 + 2.7 * x + initRadius, -1.57079, 0.075 * x - 1.6621)
            ctx.strokeStyle = '#3CDBE7'
            ctx.stroke()


            x += 1
        }
    }

    function onClick() {

        let startTime = new Date().getTime();
        let interval = setInterval(function () {
            if (new Date().getTime() - startTime > 1000) {
                clearInterval(interval);
                x = 0
                hasNotRun = false
                return;
            }
            runClickAnimation()
        }, 16.66);

    }

    clickMe.onClick = onClick;



}
clickMe()
//----------- clickMe end ----------