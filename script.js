
let guesses = [];

let correctNumber = getRandomNumber();

window.onload = function() {
    document.getElementById("number-submit").addEventListener("click", playGame);
    document.getElementById("restart-game").addEventListener("click", initGame);
    document.addEventListener('keyup', playGame);
}

function playGame(event) {
    if (event.keyCode === 13) {
        let numberGuess = document.getElementById("number-guess").value;
        displayResult(numberGuess);
        saveGuessHistory(numberGuess);
        displayHistory();
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
    displayHistory();
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
    let list = "<ul class='list-group'>"
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
    let dialog = getDialog('won', text);
    document.getElementById("result").innerHTML = dialog;
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