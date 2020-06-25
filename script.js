
let guesses = [];

let correctNumber = getRandomNumber();

let flag = 0;

window.onload = function() {
    document.getElementById("number-submit").addEventListener("click", playGame);
    document.getElementById("restart-game").addEventListener("click", initGame);
    document.addEventListener('keyup', playGame);
    document.getElementById('number-guess').focus();
    document.getElementById('number-guess').select();
}

function playGame(event) {
    if (event.keyCode === 13 && flag === 0) {
        let numberGuess = document.getElementById("number-guess").value;
        displayResult(numberGuess);
        saveGuessHistory(numberGuess);
        displayHistory();
        let IHTML = '<input id="number-guess" style="cursor: auto;" class="form-control form-control-lg" type="number" placeholder="What\'s your guess?">'
        document.getElementById("inputGuess").innerHTML = IHTML;
        document.getElementById('number-guess').focus();
        document.getElementById('number-guess').select();
    }
}

function displayResult(numberGuess) {
    if (numberGuess > correctNumber) {
        showNumberAbove();
    } else if (numberGuess < correctNumber) {
        showNumberBelow();
    } else {
        showYouWon();
    }
} 

function initGame() {
    guesses = [];
    resetResultContent();
    correctNumber = getRandomNumber();
    document.getElementById("history").innerHTML = "";
    flag = 0;
    document.getElementById("number-submit").addEventListener("click", playGame);
    let IHTML = '<input id="number-guess" class="form-control form-control-lg" type="number" placeholder="What\'s your guess?">'
    document.getElementById("inputGuess").innerHTML = IHTML;
    document.getElementById('number-guess').focus();
    document.getElementById('number-guess').select();
}

function resetResultContent() {
    document.getElementById("result").innerHTML = "";
}

function getRandomNumber() {
    let RN = Math.floor(Math.random() * 100) + 1;
    return RN;
}

function saveGuessHistory(guess) {
    guesses.push(guess);
}

function displayHistory() {
    let list = "<h5 style='color: yellow;'>Guess History</h5>"
    list += "<ul id='historyScrollbar' class='list-group'>"
    let index = guesses.length-1;
    while(index>=0){
        list+="<li class='list-group-item'>You guessed " + guesses[index] + "</li>"
        index--;
    }
    list += "</ul>";
    document.getElementById("history").innerHTML = list;
}

function getDialog(dialogType, text) {
    let dialog;
    switch(dialogType) {
        case "warning":
            dialog = "<div class='alert alert-warning' role='alert'>"
            break;
        case "won":    
            dialog = "<div class='alert alert-success' role='alert'>"
            break;
    }
    dialog += text;
    dialog += "</div>"
    return dialog;
}

function showYouWon() {
    let len = guesses.length + 1;
    const text = `Awesome job, you got it in ${len} tries!`
    flag = 1;
    let dialog = getDialog('won', text);
    document.getElementById("result").innerHTML = dialog;
    document.getElementById("number-submit").addEventListener("click",);
}

function showNumberAbove() {
    const text = "Your guess is too high!"
    let dialog = getDialog('warning', text);
    document.getElementById("result").innerHTML = dialog;
}

function showNumberBelow() {
    const text = "Your guess is too low!"
    let dialog = getDialog('warning', text);
    document.getElementById("result").innerHTML = dialog;
}