let startTime, elapsedTime = 0, timerInterval;
const displayMin = document.getElementById('minutes');
const displaySec = document.getElementById('seconds');
const displayMs = document.getElementById('milliseconds');
const lapsList = document.getElementById('lapsList');

function timeToString(time) {
    let diffInMin = time / 3600000;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    return {
        mm: mm.toString().padStart(2, '0'),
        ss: ss.toString().padStart(2, '0'),
        ms: ms.toString().padStart(2, '0')
    };
}

function print(time) {
    let formatted = timeToString(time);
    displayMin.innerHTML = formatted.mm;
    displaySec.innerHTML = formatted.ss;
    displayMs.innerHTML = formatted.ms;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        print(elapsedTime);
    }, 10);
    toggleButtons(true);
}

function pause() {
    clearInterval(timerInterval);
    toggleButtons(false);
}

function reset() {
    clearInterval(timerInterval);
    print(0);
    elapsedTime = 0;
    lapsList.innerHTML = '';
    toggleButtons(false);
}

function lap() {
    let li = document.createElement('li');
    let time = timeToString(elapsedTime);
    li.innerHTML = `<span>Lap ${lapsList.children.length + 1}</span> <span>${time.mm}:${time.ss}:${time.ms}</span>`;
    lapsList.prepend(li);
}

function toggleButtons(isRunning) {
    document.getElementById('startBtn').disabled = isRunning;
    document.getElementById('pauseBtn').disabled = !isRunning;
    document.getElementById('lapBtn').disabled = !isRunning;
}

// Event Listeners
document.getElementById('startBtn').addEventListener('click', start);
document.getElementById('pauseBtn').addEventListener('click', pause);
document.getElementById('resetBtn').addEventListener('click', reset);
document.getElementById('lapBtn').addEventListener('click', lap);