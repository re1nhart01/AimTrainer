const screens = document.querySelectorAll('.screen')
const timer = document.querySelector('#time');
const board = document.querySelector('.board')
let time = 0;
const startButton = document.querySelector('.start').addEventListener('click', (e) => {
e.preventDefault();
screens[0].classList.add('up')
})

const timeList = document.querySelector('.time-list').addEventListener('click', (e) => {
    if(e.target.classList.contains('time-btn')) {
        time = Number(e.target.getAttribute('data'))
        console.log(time)
        startGame();
    }
})

let points = 0;

function startGame() {
    let mainTimer = setInterval(() => {
        time--;
        if (time < 10) {
            timer.innerHTML = `00:0${time}`
        } else {
            timer.innerHTML = `00:${time}`
        }
        if (time === 0) {
            clearInterval(mainTimer)
        }

    }, 1000)
    screens[1].classList.add('up');
    timer.innerHTML = `00:${time}`
    createRandomCircle();

}



function createRandomCircle() {
    const circle = document.createElement('div')
    const boardCord = {
        x: getXPosition(0,470),
        y: getYPosition(0,470)
    }
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    const size = Size(5,60)
    circle.classList.add("circle");
    circle.addEventListener('click', onCircleClick)
    circle.style.backgroundColor = `#${randomColor}`
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${boardCord.y}px`
    circle.style.left = `${boardCord.x}px`
    board.append(circle);
}

function onCircleClick(event) {
    event.target.remove()
    if (time === 0) {
        onGameEnded();
    } else {
        createRandomCircle()
    }
    points++;
}

function Size(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getXPosition(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getYPosition(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function onGameEnded() {
console.log(`GameEnded: ${points}`)
    let whenGameEnded = document.createElement('h3');
    let pressF = document.createElement('h4');
    pressF.innerText = "Press F to pay respect(restart)"
    pressF.addEventListener('click', () => window.location.reload())
    pressF.style.cursor = 'pointer'
    pressF.style.border = '2px solid black'
    pressF.style.display = 'inline'
whenGameEnded.classList.add('whenGameEnded')
    pressF.classList.add('pressF')
whenGameEnded.innerText = `Игра Окончена, ваши очки равны: ${points} поинтов`


    board.append(whenGameEnded)
    board.append(pressF)

}