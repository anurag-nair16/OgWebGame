const gameBoard = document.getElementById('gameBoard');
const startButton = document.getElementById('startButton');
const scoreDisplay = document.getElementById('score');
const movesDisplay = document.getElementById('moves');
const endGameModal = document.getElementById('endGameModal');
const endGameMessage = document.getElementById('endGameMessage');
const restartButton = document.getElementById('restartButton');
const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...cardValues, ...cardValues];
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let score = 0;

// Shuffle the cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Create card elements
function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('flip-card');

    const cardInner = document.createElement('div');
    cardInner.classList.add('flip-card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('flip-card-front');
    cardFront.textContent = '?'; // Default content for the front

    const cardBack = document.createElement('div');
    cardBack.classList.add('flip-card-back');
    cardBack.textContent = value; // Content for the back

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener('click', handleCardClick);

    return card;
}

// Initialize the game board
function initializeGame() {
    shuffle(cards);
    gameBoard.innerHTML = '';
    cards.forEach(value => {
        const card = createCard(value);
        gameBoard.appendChild(card);
    });
    matchedCards = [];
    moves = 0;
    score = 0;
    updateScore();
    updateMoves();
    document.querySelector('.scoreboard').style.display = 'none'; // Hide scoreboard
    endGameModal.style.display = 'none'; // Hide end game modal
}

// Handle card click
function handleCardClick(event) {
    const clickedCard = event.currentTarget;

    if (flippedCards.length === 2 || clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
        return;
    }

    clickedCard.classList.add('flipped');
    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
        moves++;
        updateMoves();
        checkForMatch();
    }
}

// Check if the flipped cards match
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;
    const firstCardInner = firstCard.querySelector('.flip-card-inner');
    const secondCardInner = secondCard.querySelector('.flip-card-inner');

    if (firstCardInner.querySelector('.flip-card-back').textContent === secondCardInner.querySelector('.flip-card-back').textContent) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards.push(firstCard, secondCard);
        score += 100; // Increase score for a match
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }, 1000);
    }
    flippedCards = [];
    updateScore();
    if (matchedCards.length === cards.length) {
        setTimeout(() => {
            const averageScore = moves > 0 ? Math.round(score / moves) : 0;
            endGameMessage.innerHTML = `You matched all cards in <strong>${moves}</strong> moves. Your final score is <strong>${score}</strong>. Average score per move: <strong>${averageScore}</strong>.`;
            endGameModal.style.display = 'block'; // Show end game modal
        }, 500);
    }
}


// Update score display
function updateScore() {
    scoreDisplay.textContent = score;
}

// Update moves display
function updateMoves() {
    movesDisplay.textContent = moves;
}

// Restart the game
function restartGame() {
    endGameModal.style.display = 'none'; // Hide end game modal
    initializeGame();
}

// Event listeners
startButton.addEventListener('click', initializeGame);
restartButton.addEventListener('click', restartGame);
