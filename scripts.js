//Toggle documentation
$(document).ready(function () {
    $('#toggleDocumentation').click(function () {
        $('#documentation').toggle()
        $('.content').toggle()
    })
})

$('#documentation').hide() // hide documentation on load
$('.content').show() // hide documentation on load

//----------- Logo -------------
function logo() {
    let canvas = $('#logo').get(0)

    let ctx = canvas.getContext('2d')
    canvas.width = 80
    canvas.height = 80

    let initRadius = 25
    let originX = canvas.width / 2
    let originY = canvas.height / 2
    let x = 0 // animation progress (0-100)
    let step = 4 // no. of x to skip each frame (to controll speed)
    let interval // for moving through the frames

    let circle = {
        radius: initRadius,
        hoverColor: 'white',
        wasInside: false,
    }

    let smallCircle = {
        radius: initRadius / 2,
        hoverColor: 'white',
        wasInside: false,
    }

    function drawCircle(circle, fillStyle, centerX, centerY, startAngle, endAngle, isInside) {
        ctx.beginPath()
        ctx.fillStyle = isInside ? circle.hoverColor : fillStyle // changes color based on isInside boolean
        ctx.moveTo(originX, originY)
        ctx.arc(centerX, centerY, circle.radius, startAngle, endAngle)
        ctx.fill()
        circle.wasInside = isInside
    }

    function animate(isInside) {
        ctx.fillStyle = 'transparent'
        ctx.clearRect(0, 0, canvas.width, canvas.width)
        drawCircle(circle, '#F178AE', originX, originY, (0.02 * x + 0.5) * Math.PI, (0.02 * x + 1) * Math.PI, isInside)
        drawCircle(circle, '#F25D23', originX, originY, (0.02 * x + 1) * Math.PI, (0.02 * x + 1.5) * Math.PI, isInside)
        drawCircle(circle, '#FBB019', originX, originY, (0.02 * x + 1.5) * Math.PI, (0.02 * x + 0) * Math.PI, isInside)
        drawCircle(
            smallCircle,
            '#F178AE',
            -(initRadius / 2) * Math.sin(x / (50 / Math.PI)) + originY,
            (initRadius / 2) * Math.cos(x / (50 / Math.PI)) + originY,
            (0.02 * x + 1.5) * Math.PI,
            (0.02 * x + 0.5) * Math.PI,
            isInside
        )
        drawCircle(
            smallCircle,
            '#F03F97',
            -(initRadius / 2) * Math.sin(x / (50 / Math.PI)) + originY,
            (initRadius / 2) * Math.cos(x / (50 / Math.PI)) + originY,
            (0.02 * x + 0.5) * Math.PI,
            (0.02 * x + 1.5) * Math.PI,
            isInside
        )
        ctx.fillStyle = 'gray'
        ctx.font = 'italic 12px sans-serif'
        ctx.fillText('hover me 2', 13, 79)
    }

    // clearing canvas
    ctx.clearRect(0, 0, canvas.width, canvas.width)

    // initialize drawing
    animate(false)

    // mouse enter canvas event listner
    canvas.addEventListener('mouseover', function () {
        clearInterval(interval)

        interval = setInterval(function () {
            if (x > 100 || x < 0 - step) {
                clearInterval(interval)
            } else {
                animate(true)
                x += step
            }
        }, 16.66) // 1000ms / 60fps = 16.66 ms/frame
    })

    // mouse exit canvas event listner
    canvas.addEventListener('mouseout', function () {
        clearInterval(interval)

        interval = setInterval(function () {
            if (x > 100 + step || x < 0) {
                clearInterval(interval)
            } else {
                animate(false)
                x -= step
            }
        }, 16.66) // 1000ms / 60fps = 16.66 ms/frame
    })
}

logo()
//----------- Logo end ----------

//----------- Fourier series -------------
function fourier() {
    let canvas = $('#fourierCanvas').get(0)
    let ctx = canvas.getContext('2d')
    canvas.width = 1200
    canvas.height = 400

    // get value from input field for setting degree
    $('#degree').val(3)
    let degree = $('#degree').val()

    function setDegree() {
        let val = $('#degree').val()
        if (val > 0 && val < 301) degree = val
    }

    fourier.setDegree = setDegree // make nested function available outside main function

    let initRadius = 100
    let originY = canvas.height / 2 // center YAxis in middle
    let originX = initRadius * 3

    let time = 0
    let traceY = []

    // function for running animation
    function furierWave() {
        ctx.strokeStyle = 'rgba(255,255,255,0.5)'

        // delete trace if longer than maxTraceLen
        maxTraceLen = 800
        if (traceY.length > maxTraceLen) {
            traceY.pop()
        }

        //clearing canvas
        ctx.fillStyle = 'transparent'
        ctx.clearRect(0, 0, canvas.width, canvas.width)

        // let originX = initRadius + 200
        let x = originX
        let y = originY
        let lastX = originX
        let lastY = originY

        // ----- Circles and rotation -----
        for (let i = 0; i < degree; i++) {
            let n = i * 2 + 1
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
        ctx.strokeStyle = 'white'
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

fourier() //run init and animation
//----------- Fourier series end ----------

//--------------- clickMe -----------------
function clickMe() {
    let hasNotRun = true // check for if animation has already run

    let canvas = $('#clickMeCanvas').get(0)
    let ctx = canvas.getContext('2d')
    canvas.width = 200
    canvas.height = 200

    let initRadius = 35
    let originX = canvas.width / 2
    let originY = canvas.height / 2
    let x = 0 // frame variable

    ctx.strokeStyle = 'rgba(255,255,255,0.7)'
    ctx.lineWidth = 2
    ctx.fillStyle = 'rgba(255,255,255,0.9)'

    // init click me button
    ctx.beginPath()
    ctx.arc(originX, originY, initRadius, 0, 2 * Math.PI)
    ctx.font = '16px Arial'
    ctx.fillText('Click me', originX - 30, originY + 5)
    ctx.stroke()

    // runs animation on click
    function runClickAnimation() {
        if (hasNotRun) {
            ctx.clearRect(0, 0, canvas.width, canvas.width)

            ctx.strokeStyle = 'rgba(255,255,255,0.7)'
            ctx.lineWidth = 2
            ctx.fillStyle = 'rgba(255,255,255,0.9)'

            // initial circle and text - fadeout
            ctx.beginPath()
            let initCircleRadius = -0.01 * x ** 2 - 0.14 * x + initRadius
            if (initCircleRadius < 0) {
                initCircleRadius = 0
            }
            ctx.arc(originX, originY, initCircleRadius, 0, 2 * Math.PI)

            let fontSize = -0.005 * x ** 2 - 0.14 * x + 16
            ctx.font = fontSize + 'px Arial'
            ctx.fillText('Click me', 0.01 * x ** 2 + 0.14 * x + originX - 28, originY + 5)
            ctx.stroke()

            //drawing new circles with animation
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

            x += 1 // calculate next frame
        }
    }

    function onClick() {
        let startTime = new Date().getTime()
        let interval = setInterval(function () {
            if (new Date().getTime() - startTime > 1000) {
                //animation runs for 1 second
                clearInterval(interval)
                x = 0
                hasNotRun = false
                return
            }
            runClickAnimation()
        }, 16.66) // 1000ms / 60fps = 16.66 ms/frame
    }

    clickMe.onClick = onClick
}

clickMe() // run init, wait for click
//----------- clickMe end ----------
