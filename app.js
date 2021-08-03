const status = document.querySelector('.status');
const gridSquares = document.querySelectorAll('.grid-square');
const resetButton = document.querySelector('.reset');  

let xIsNext = true;

const handleReset = (e) => {
    console.log(e);
}

const handleSquareClick = (e) => {
    console.log(e);
}

resetButton.addEventListener('click', handleReset);

for (gridSquare of gridSquares) {
    console.log(gridSquare)
    gridSquare.addEventListener('click', handleSquareClick)
}