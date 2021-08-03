const status = document.querySelector('.status');
const gridSquares = document.querySelectorAll('.grid-square');
const resetButton = document.querySelector('.reset');  

let xIsNext = true;
let winner = null;

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