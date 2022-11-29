var words = ["scéal", "cúthail", "mícheart", "stobhach"];
var word;
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "l", "m", "n", "o", "p", "r", "s", "t", "u", "á", "é", "í", "ó", "ú"]
var max_fails = 10;
var active = true;
var selectedChars = "";
var gameStateEl = document.querySelector('.game-state');
var failsEl = document.querySelector('.fails');
var wordEl = document.querySelector('.word');
var keyboardEl = document.querySelector('.keyboard');
var newGameEl = document.querySelector('.new-game');
init();
newGameEl.addEventListener('click', () => { initNewGame(); });
document.body.addEventListener('keypress', (e) => {
    if (alphabet.includes(e.key)) {
        handleKey(e.key);
    }
});
function init() {
    for (var i = 0; i < alphabet.length; i++) {
        document.querySelector('.keyboard').innerHTML += "<div class='key' id=" + alphabet[i] + " onclick='handleKey(`" + alphabet[i] + "`)'>" + alphabet[i].toUpperCase() + "</div>";
    }
}
function initNewGame() {
    isGameActive = true;
    initNewWord();
    selectedChars = new Set();
    failCount = 0;
    resetGameStateElement();
    resetKeyboard();
    resetFailsElement();
    updateGameState();
}
function initNewWord() {
    word = getRandomWord();
    missingLetters = word.length;
    console.log(word);
    wordEl.innerHTML = '';
    word.split('').forEach((char) => {
        const charEl = document.createElement('div');
        charEl.classList.add('char');
        charEl.textContent = '_';
        wordEl.appendChild(charEl);
    });
}
function resetKeyboard() {
    for (let i = 0; i < keyboardEl.children.length; i++) {
        keyboardEl.children[i].classList.remove('key--fade-out');
    }
    ;
}
function resetGameStateElement() {
    gameStateEl.classList.remove('game-state--active');
    gameStateEl.classList.remove('game-state--win');
    gameStateEl.classList.remove('game-state--fail');
}
function resetFailsElement() {
    failsEl.style.backgroundColor = 'white';
}
function getRandomWord() {
    const max = words.length;
    const rand = Math.floor(max * Math.random());
    return words[rand].toUpperCase();
}
function handleKey(key) {
    console.log(key);
    key = key.toUpperCase();
    if (!isGameActive) {
        return;
    }
    if (!selectedChars.has(key)) {
        selectedChars.add(key);
        fadeKeyInKeyboard(key);
        if (word.includes(key)) {
            word.split('').forEach((char, i) => {
                if (char === key) {
                    wordEl.children[i].textContent = key;
                    missingLetters--;
                }
            });
        }
        else {
            failCount++;
            failsEl.style.color = `rgba(255,0,0,0.${failCount - 1})`;
        }
        updateGameState();
    }
}
function fadeKeyInKeyboard(key) {
    document.getElementById(key.toLowerCase()).classList.add('key--fade-out');
}
function showWord() {
    word.split('').forEach((char, i) => {
        wordEl.children[i].textContent = char;
    });
}
function updateGameState() {
    failsEl.textContent = `FAILS: ${failCount}/${max_fails}`;
    if (failCount === max_fails) {
        isGameActive = false;
        gameStateEl.firstElementChild.textContent = 'FAIL!!';
        gameStateEl.classList.add('game-state--fail');
        showWord();
        return;
    }
    else if (missingLetters === 0) {
        isGameActive = false;
        gameStateEl.firstElementChild.textContent = 'WIN!!';
        gameStateEl.classList.add('game-state--win');
        return;
    }
    else {
        gameStateEl.firstElementChild.textContent = 'ACTIVE GAME';
        gameStateEl.classList.add('game-state--active');
    }
}
initNewGame();