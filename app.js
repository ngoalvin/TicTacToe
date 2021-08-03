const status = document.querySelector('.status');
const gridSquares = document.querySelectorAll('.grid-square');
const resetButton = document.querySelector('.reset');  
const modalBg = document.querySelector('.modal-bg');
const modalBg2 = document.querySelector('.modal-bg2');
const winnerDiv = document.querySelector('.winner');
const error = document.querySelector('.error');

let xIsNext = true;
let winner = null;
let mode = null;
let randomOrder = [];


// generates numbers 0-8 and pushes them into randomOrder array
const generateRandomOrder = () => {
    while (randomOrder.length !== 9) {
        let r = Math.floor(Math.random() * 9);
        if(randomOrder.indexOf(r) === -1) randomOrder.push(r);
    };
};

// closes menu modal
const closeStartModal = () => {
    modalBg2.classList.remove('bg-active');
};

//-----------------------------CHECK WINNER FUNCTIONS-----------------------------------------------------------------

const checkHoriz = () => {
    for (let i = 0; i < 7; i+=3) {
        if (gridSquares[i].classList[1] && gridSquares[i].classList[1] === gridSquares[i + 1].classList[1] && gridSquares[i].classList[1] === gridSquares[i + 2].classList[1]) {
            winner = gridSquares[i].classList[1];
        };
    };
};

const checkVert = () => {
    for (let i = 0; i < 3; i++) {
        if (gridSquares[i].classList[1] && gridSquares[i].classList[1] === gridSquares[i + 3].classList[1] && gridSquares[i].classList[1] === gridSquares[i + 6].classList[1]) {
            winner = gridSquares[i].classList[1];
        };
    };
};

const checkDiag = () => {
    if (gridSquares[0].classList[1] && gridSquares[0].classList[1] === gridSquares[4].classList[1] && gridSquares[0].classList[1] === gridSquares[8].classList[1] ) {
        winner = gridSquares[0].classList[1];
    } else if (gridSquares[2].classList[1] && gridSquares[2].classList[1] === gridSquares[4].classList[1] && gridSquares[2].classList[1] === gridSquares[6].classList[1]) {
        winner = gridSquares[2].classList[1];
    };
};

const checkTie = () => {
    for (let i =0; i < gridSquares.length; i++) {
        if (!gridSquares[i].classList[1]) {
            return false;
        };
    };
    winner = 'tie';
};

const checkWinner = () => {
    checkTie();
    checkHoriz();
    checkVert();
    checkDiag();
};

//------------------------------------GAME STATUS-----------------------------------------------------------------------

const gameStatus = () => {
    checkWinner();
    if (winner) {
        if (winner === 'tie') {
            let text = document.createTextNode(`The game ended in a tie!`);
            modalBg.classList.add('bg-active');
            winnerDiv.appendChild(text);
        } else {
            let text = document.createTextNode(`${winner} has won the game!`);
            modalBg.classList.add('bg-active');
            winnerDiv.appendChild(text);
        };
    };
};

//------------------------------------MODE CHECK FUNCTIONS----------------------------------------------------------------
const randomMode = () => {
    mode = 'random';
    generateRandomOrder();
    closeStartModal();
};

const normalMode = () => {
    mode = 'normal';
    closeStartModal();
};


//--------------------------------------EVENT HANDLERS--------------------------------------------------------------

const handleReset = () => {
    xIsNext = true;
    winner = null;
    mode = null;
    randomOrder = [];
    for (let gridSquare of gridSquares) {
        gridSquare.classList.remove('blue');
        gridSquare.classList.remove('yellow');
    }
    modalBg.classList.remove('bg-active');
    winnerDiv.innerText = '';
    status.innerHTML = 'Blue is next';
    modalBg2.classList.add('bg-active');
    error.classList.remove('active');
};

const handleSquareClick = (e) => {
    const classList = e.target.classList;
    if (mode === 'normal') {
        // if square is clicked on show error
        if (classList[1] || winner) {
            error.classList.add('active');
            return;
        }
        // code to choose who is next
        if (xIsNext) {
            e.target.classList.add('blue');
            error.classList.remove('active');
            gameStatus();
            xIsNext = !xIsNext;
            status.innerHTML = 'Blue is next';
        } else {
            e.target.classList.add('yellow');
            error.classList.remove('active');
            gameStatus();
            xIsNext = !xIsNext;
            status.innerHTML = 'Yellow is next';
        }
    } else if (mode === 'random') {
        if (xIsNext) {
            gridSquares[randomOrder[randomOrder.length - 1]].classList.add('blue');
            randomOrder.pop();
            gameStatus();
            xIsNext = !xIsNext;
            status.innerHTML = 'Blue is next';
        } else {
            gridSquares[randomOrder[randomOrder.length - 1]].classList.add('yellow');
            gameStatus();
            randomOrder.pop();
            xIsNext = !xIsNext;
            status.innerHTML = 'Yellow is next';
        };
    };
};

//-------------------------------------EVENT LISTENERS----------------------------------------------------------------------

resetButton.addEventListener('click', handleReset);

for (gridSquare of gridSquares) {
    gridSquare.addEventListener('click', handleSquareClick);
};
