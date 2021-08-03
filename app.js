const status = document.querySelector('.status');
const gridSquares = document.querySelectorAll('.grid-square');
const resetButton = document.querySelector('.reset');  

let xIsNext = true;
let winner = null;

const checkHoriz = () => {
    for (let i = 0; i < 7; i+=3) {
        if (gridSquares[i].classList[1] && gridSquares[i].classList[1] === gridSquares[i + 1].classList[1] && gridSquares[i].classList[1] === gridSquares[i + 2].classList[1]) {
            winner = gridSquares[i].classList[1];
            console.log(winner)
        }
    }
}

const checkVert = () => {
    for (let i = 0; i < 3; i++) {
        if (gridSquares[i].classList[1] && gridSquares[i].classList[1] === gridSquares[i + 3].classList[1] && gridSquares[i].classList[1] === gridSquares[i + 6].classList[1]) {
            winner = gridSquares[i].classList[1];
            console.log(winner)
        }
    }
}

const checkDiag = () => {
    if (gridSquares[0].classList[1] && gridSquares[0].classList[1] === gridSquares[4].classList[1] && gridSquares[0].classList[1] === gridSquares[8].classList[1] ) {
        winner = gridSquares[0].classList[1];
    } else if (gridSquares[2].classList[1] && gridSquares[2].classList[1] === gridSquares[4].classList[1] && gridSquares[2].classList[1] === gridSquares[6].classList[1]) {
        winner = gridSquares[2].classList[1];
        console.log(winner, 'diag')
    }
}

const checkTie = () => {
    for (let i =0; i < gridSquares.length; i++) {
        if (!gridSquares[i].classList[1]) {
            return false;
        }
    }
    winner = 'tie';
    console.log(winner)
}

const checkWinner = () => {
    checkHoriz();
    checkVert();
    checkDiag();
    checkTie();
}

const handleReset = (e) => {
    console.log(e);
}

const handleSquareClick = (e) => {
    const classList = e.target.classList;
    if (classList[1] || winner) {
        return;
    }

    if (xIsNext) {
        e.target.classList.add('blue');
        xIsNext = !xIsNext;
        status.innerHTML = 'Blue is next';
    } else {
        e.target.classList.add('yellow');
        xIsNext = !xIsNext;
        status.innerHTML = 'Yellow is next';
    }
};
resetButton.addEventListener('click', handleReset);

for (gridSquare of gridSquares) {
    console.log(gridSquare)
    gridSquare.addEventListener('click', handleSquareClick)
}