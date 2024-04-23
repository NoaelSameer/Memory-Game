let score = 0;
var emojis = ["😀", "😁", "😂", "🤣", "🤩", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "😗"];
// Function to shuffle the array
shuffleArray(emojis);

function shuffleArray(emojier) {
    for (let i = emojier.length - 1; i > 0; i--) {
        // gets a random number from 0 and i
        let j = Math.floor(Math.random() * (i + 1));
        // Switches around the indexes
        [emojier[i], emojier[j]] = [emojier[j], emojier[i]];
    }
}

var container = document.getElementById("container");
for (let i = 0; i < 30; i++) {
    var card = document.createElement("div");
    card.innerHTML = `
        <div onclick="flipper(${i})" class="card" id="card${i}">
            <div class="cardFace cardFront">?</div>
            <div class="cardFace cardBack">${emojis[i % emojis.length]}</div>
        </div>`;
    container.appendChild(card);
}

var flippedCards = [];

function flipper(indexer) {
    let card = document.getElementById('card' + indexer);
    // Checks if there is less than 2 cards, and if it isnt in the flipped cards, so it cant be clicked twice 
    if (flippedCards.length < 2 && !flippedCards.includes(indexer)) {
        card.classList.add('flipped');
        flippedCards.push(indexer);
        // It checks it once it reaches 2
        if (flippedCards.length == 2) {
            checker();
        }
    }
}

function checker() {
    let card1Content = document.getElementById('card' + flippedCards[0]).querySelector('.cardBack').innerHTML;
    let card2Content = document.getElementById('card' + flippedCards[1]).querySelector('.cardBack').innerHTML;

    if (card1Content === card2Content) {
        flippedCards = [];
    }
    else {
        setTimeout(() => {
            document.getElementById('card' + flippedCards[0]).classList.remove('flipped');
            document.getElementById('card' + flippedCards[1]).classList.remove('flipped');
            flippedCards = [];
        }, 1500);
    }

    // Check s if all cards are flipped, so the game ends. 
    if (document.querySelectorAll('.card.flipped').length == 30) {
        let timeTaken = (seconds <= 1000) ? seconds : 1000;
        let finalScore = Math.round(1000 - timeTaken);
        document.getElementById('score').textContent = finalScore;
        // Stops the repeating of setInterval.
        clearInterval(timerInterval);
    }
}

let timer = document.getElementById('timer');
let seconds = 0;
let timerInterval = setInterval(() => {
    seconds++;
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    timer.innerHTML = `Timer: ${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
}, 1000);
