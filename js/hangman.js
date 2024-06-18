var dictionary = [
    "velocidad",
    "cinturon",
    "peatones",
    "ciclistas",
    "vialidad",
    "semaforo",
    "prevencion",
    "atencion"
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
    answer = dictionary[Math.floor(Math.random() * dictionary.length)];
}

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
          <button
            class="btn btn-lg btn-primary m-2"
            id='${letter}'
            onClick="handleGuess('${letter}')"
          >
            ${letter}
          </button>
        `
    ).join('');

    $('#keyboard').html(buttonsHTML); // Uso de jQuery para el teclado
}

function handleGuess(chosenLetter) {
    if (guessed.indexOf(chosenLetter) === -1) {
        guessed.push(chosenLetter);
        $('#' + chosenLetter).attr('disabled', true); // Uso de jQuery para habilitación y deshabilitación de teclas utilizadas
    }

    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
    }
}

function updateHangmanPicture() {
    $('#hangmanPic').attr('src', './img/' + mistakes + '.jpg');
}

function checkIfGameWon() {
    if (wordStatus === answer) {
        $('#keyboard').html('Ganaste!!!'); // Uso de jQuery para chequear si ganó
    }
}

function checkIfGameLost() {
    if (mistakes === maxWrong) {
        $('#wordSpotlight').html('La respuesta era: ' + answer);
        $('#keyboard').html('Perdiste!!!'); // Uso de jQuery para chequear si perdió
    }
}

function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
    $('#mistakes').text(mistakes); // Uso de jQuery para actualizar cantidad de errores
}

function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = './img/0.jpg';

    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
