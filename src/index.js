"use strict"
// камень-ножницы-бумага



let playScore = 0;
let compScore = 0;
let id = 0;
let res = {};
let base = [];
let screenSize = "auto"
const dataBase = [];

const refs = {
    mainContainerEl: document.querySelector('.main-container'),
    rockEl: document.querySelector('.rock-container'),
    paperEl: document.querySelector('.paper-container'),
    scissorsEl: document.querySelector('.scissors-container'),
    resultContainerEl: document.querySelector('.result-container'),
    playScoreEl: document.querySelector('.player-score'),
    compScoreEl: document.querySelector('.comp-score'),
    titleEl: document.querySelector('.title-cont')
};

const resizeObserver = new ResizeObserver(onResize)

function onResize(entries) {

    const aspectRatio = entries[0].contentRect.width / entries[0].contentRect.height

    if (aspectRatio < 0.7) { screenSize = "cover" }
    else { screenSize = "auto" };

    //Добавление и удаление классов на широкий экран
    if (aspectRatio > 0.7) {
        refs.rockEl.classList.add('wide-screen');
        refs.paperEl.classList.add('wide-screen');
        refs.scissorsEl.classList.add('wide-screen');
        refs.playScoreEl.classList.add('wide-screen');
        refs.compScoreEl.classList.add('wide-screen');
    } else {
        refs.rockEl.classList.remove('wide-screen');
        refs.paperEl.classList.remove('wide-screen');
        refs.scissorsEl.classList.remove('wide-screen');
        refs.playScoreEl.classList.remove('wide-screen');
        refs.compScoreEl.classList.remove('wide-screen');
    };

    // Добавление и удаление классов на самый широкий экран
    if (aspectRatio > 1.8) {
        refs.rockEl.classList.add('widest-screen');
        refs.paperEl.classList.add('widest-screen');
        refs.scissorsEl.classList.add('widest-screen');
        refs.playScoreEl.classList.add('widest-screen');
        refs.compScoreEl.classList.add('widest-screen');
    } else {
        refs.rockEl.classList.remove('widest-screen');
        refs.paperEl.classList.remove('widest-screen');
        refs.scissorsEl.classList.remove('widest-screen');
        refs.playScoreEl.classList.remove('widest-screen');
        refs.compScoreEl.classList.remove('widest-screen');
    }

    // И для особых извращенцев
    if (aspectRatio > 2.5) {
        refs.rockEl.classList.add('widest2-screen');
        refs.paperEl.classList.add('widest2-screen');
        refs.scissorsEl.classList.add('widest2-screen');
        refs.playScoreEl.classList.add('widest2-screen');
        refs.compScoreEl.classList.add('widest2-screen');
    } else {
        refs.rockEl.classList.remove('widest2-screen');
        refs.paperEl.classList.remove('widest2-screen');
        refs.scissorsEl.classList.remove('widest2-screen');
        refs.playScoreEl.classList.remove('widest2-screen');
        refs.compScoreEl.classList.remove('widest2-screen');
    }

};

resizeObserver.observe(refs.mainContainerEl)


initialData();


//Выбор игрока, включение иконок
function initialData() {
    refs.resultContainerEl.classList.add('is-hidden');
    refs.rockEl.classList.remove('is-hidden');
    refs.paperEl.classList.remove('is-hidden');
    refs.scissorsEl.classList.remove('is-hidden');
    refs.mainContainerEl.addEventListener('click', playerChoiceAdd)
};


function playerChoiceAdd(event) {



    switch (event.target) {
        case refs.rockEl:
            compChoiceAdd('rock');
            break;
        case refs.paperEl:
            compChoiceAdd('paper');
            break;
        case refs.scissorsEl:
            compChoiceAdd('scissors');
            break;
    }
}

//Создаем выбор компа и передаем в обработку вместе с выбором игрока
function compChoiceAdd(playerChoice) {

    refs.mainContainerEl.removeEventListener('click', playerChoiceAdd);

    const comp = Math.ceil(Math.random() * 3);
    let compChoice = '';
    switch (comp) {
        case (1):
            compChoice = 'rock'
            break;
        case (2):
            compChoice = 'paper'
            break;
        case (3):
            compChoice = 'scissors'
            break;
    };
    dataProcessing(playerChoice, compChoice)
}


//Обработка данных и выдача массива  данных результатов
function dataProcessing(playerChoice, compChoice) {

    let message = '';

    const innerData = {
        rockrock: 'draw',
        rockpaper: 'loss',
        rockscissors: 'win',
        paperpaper: 'draw',
        paperrock: 'win',
        paperscissors: 'loss',
        scissorsscissors: 'draw',
        scissorsrock: 'loss',
        scissorspaper: 'win'
    };

    message = innerData[playerChoice + compChoice];


    switch (message) {
        case 'win':
            playScore += 1;
            break;
        case 'loss':
            compScore += 1;
            break;
    }

    const result = {
        playerChoice,
        compChoice,
        message,
        playScore,
        compScore,
    };

    resultsBase(result);
    showResult(result);
};

//Отображает результаты последнего матча на экране
function showResult(result) {
    refs.rockEl.classList.add('is-hidden');
    refs.paperEl.classList.add('is-hidden');
    refs.scissorsEl.classList.add('is-hidden');
    refs.resultContainerEl.classList.remove('is-hidden');
    refs.resultContainerEl.style.backgroundSize = 'cover';

    switch (result.message) {
        case 'win':
            // refs.resultContainerEl.style.background = ' ';
            refs.resultContainerEl.style.backgroundSize = screenSize;
            refs.resultContainerEl.classList.remove("loss");
            refs.resultContainerEl.classList.remove("draw");
            refs.resultContainerEl.classList.add("win");
            break;

        case 'loss':
            // refs.resultContainerEl.style.background = 'url(./images/loss.png)  center center no-repeat ';
            refs.resultContainerEl.style.backgroundSize = screenSize;
            refs.resultContainerEl.classList.remove("draw");
            refs.resultContainerEl.classList.remove("win");
            refs.resultContainerEl.classList.add("loss");
            break;

        case 'draw':
            // refs.resultContainerEl.style.background = 'url(./images/draw.png)  center center no-repeat ';
            refs.resultContainerEl.style.backgroundSize = screenSize;
            refs.resultContainerEl.classList.remove("loss");
            refs.resultContainerEl.classList.remove("win");
            refs.resultContainerEl.classList.add("draw");
            break;
    };

    refs.playScoreEl.textContent = result.playScore;
    refs.compScoreEl.textContent = result.compScore;



    refs.mainContainerEl.addEventListener('click', initialData, { once: true });
};

// формит массив

function resultsBase(innerObj) {

    id += 1;
    dataBase.push({ ...{ id }, ...innerObj });
    return dataBase;

}


    //будет выводить таблицу результатов после игры
    // function printAllResult() {
    // }
