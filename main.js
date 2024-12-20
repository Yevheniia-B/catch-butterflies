import { Butterfly, Bee } from './insect.js';

$(document).ready(function () {
    let score = 0;
    let level = 1;
    let maxLevel = 5;
    let maxInsects = 5;
    let insectsOnField = [];
    let gameInterval;
    let countdownInterval;
    let timeLeft = 60;
    let isGameRunning = false;
    let isPaused = false;

    // score for level..
    function updateScore() {
        $('#score').text(score);
        $('#level').text(level);
    }

    
    function updateTimeBar() {
        const timeBarFill = $('#time-bar-fill');
        const timeText = $('#time-text');
        timeText.text(`${timeLeft} sec`);
        
        
        const width = (timeLeft / 60) * 100;
        timeBarFill.css('width', `${width}%`);
    }

    
    function createInsect() {
        const availableFields = [];
        for (let i = 1; i <= 9; i++) {
            if (!insectsOnField.find(insect => insect.fieldId === `field${i}`)) {
                availableFields.push(`field${i}`);
            }
        }

        if (availableFields.length > 0) {
            const randomField = _.sample(availableFields);
            let insect;

            if (Math.random() < 0.2) {
                insect = new Bee(randomField);
            } else {
                insect = new Butterfly(level, randomField);
            }

            insect.create().onClick(handleInsectClick);
            insect.autoRemove();

            insectsOnField.push(insect);

            if (insectsOnField.length > maxInsects) {
                const firstInsect = insectsOnField.shift();
                firstInsect.element.remove();
            }
        }
    }

    
    function handleInsectClick(scoreImpact) {
        score += scoreImpact;
        updateScore();
    }

    
    function updateLevel() {
        if (score >= level * 10 && level < maxLevel) {
            level++;
            maxInsects++;
        }
    }

    
    function startGame() {
        isGameRunning = true;
        isPaused = false;
        $('#start-btn').text('PAUSE');

        // countdown
        countdownInterval = setInterval(function () {
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                endGame();
            } else {
                timeLeft--;
                updateTimeBar();
            }
        }, 1000);

        // interval for creating insects..
        gameInterval = setInterval(function () {
            if (insectsOnField.length <= maxInsects) {
                createInsect();
            }
            updateLevel();
        }, 1000);
    }


    function pauseGame() {
        isPaused = true;
        clearInterval(gameInterval);
        clearInterval(countdownInterval);
        $('#start-btn').text('START');
    }

    
    function endGame() {
        isGameRunning = false;
        clearInterval(gameInterval);
        clearInterval(countdownInterval);
        alert('Гра завершена! Ваш рахунок: ' + score);
    }

    
    function restartGame() {
        score = 0;
        level = 1;
        timeLeft = 60;
        insectsOnField = [];
        updateScore();
        updateTimeBar();
        $('#start-btn').text('START');
        if (isGameRunning) {
            clearInterval(gameInterval);
            clearInterval(countdownInterval);
        }
        isGameRunning = false;
    }


    $('#start-btn').click(function () {
        if (isGameRunning) {
            if (isPaused) {
                startGame(); 
            } else {
                pauseGame();
            }
        } else {
            startGame();
        }
    });

    $('#restart-btn').click(restartGame);
});
