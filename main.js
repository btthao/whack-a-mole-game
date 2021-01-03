const area = document.querySelectorAll('.area');
const score = document.querySelector('#score');
const time = document.querySelector('.time');
const start = document.querySelector('#start');
const pause = document.querySelector('#pause');
const covid = document.querySelector('.covid');

// variables for random mole position, time left, score
let randomMole;
let timer;
let count;
let timebar = null;
let mole = null;
let pauseGame = false;

// add tick mark for correct hit and set id for each area 
for (let i = 0; i < area.length; i++) {
    area[i].innerHTML = '<div class="tick"><i class="fas fa-check"></i></div>';
    area[i].setAttribute('data-id', i);
}

const tick = document.querySelectorAll('.tick');

// play game function 
function play() {
    //set interval for timer and mole appearing 
    timebar = setInterval(timeProgress, 1000);
    mole = setInterval(randomPos, 800);

    //countdown function
    function timeProgress() {
        timer--;
        let progress = (100 / 60) * timer;
        time.style.width = `${progress}%`;
        time.innerHTML = timer;
        if (timer === 0) {
            clearInterval(timebar);
            clearInterval(mole);
            randomMole = null;
            timer = null;
            time.innerHTML = '';
            pause.style.display = 'none';
            area.forEach(function(hole) {
                hole.classList.remove('covid');
            })
            tick.forEach(function(check) {
                check.classList.remove('correct');
            })
        }
    }

    //mole position function
    function randomPos() {
        //make sure all moles are removed
        area.forEach(function(hole) {
                hole.classList.remove('covid');
            })
            //assign mole to random position
        randomMole = Math.floor(Math.random() * area.length);

        area[randomMole].classList.add('covid');

        //make sure all ticks are removed 
        tick.forEach(function(check) {
            check.classList.remove('correct');
        })

    }

    //whack mole function 
    area.forEach(function(hit) {

        hit.addEventListener('mousedown', function() {
            let hitId = hit.getAttribute('data-id');

            if (hitId == randomMole && !pauseGame) {
                count++;
                score.innerHTML = count;
                tick[randomMole].classList.add('correct');
                randomMole = null;
            }
        })


    })


}

// click start/restart game

start.addEventListener('click', function() {
    pause.style.display = 'inline-block';
    pause.innerHTML = 'Pause';
    pauseGame = false;
    clearInterval(timebar);
    clearInterval(mole);
    tick.forEach(function(check) {
        check.classList.remove('correct');
    })
    area.forEach(function(hole) {
        hole.classList.remove('covid');
    })
    timer = 60;
    count = 0;
    score.innerHTML = count;
    time.style.width = '100%';
    time.innerHTML = timer;
    play();

})

//pause/resume game 
pause.addEventListener('click', function() {
    if (!pauseGame) {
        clearInterval(timebar);
        clearInterval(mole);
        pauseGame = true;
        pause.innerHTML = 'Resume';
    } else if (pauseGame) {
        play();
        pauseGame = false;
        pause.innerHTML = 'Pause';
    }

})