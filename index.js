const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "x";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (boardState[index] !== "" || !gameActive) return;

    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {
    let roundWon = false;

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;

        if (
            boardState[a] &&
            boardState[a] === boardState[b] &&
            boardState[a] === boardState[c]
        ) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} won`;
        gameActive = false;
        return;
    }

    if (!boardState.includes("")) {
        statusText.textContent = "draw";
        gameActive = false;
        return;
    }

    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === "x" ? "o" : "x";
    statusText.textContent = `current player: ${currentPlayer}`;
}

function resetGame() {
    currentPlayer = "x";
    gameActive = true;
    boardState = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `current player: ${currentPlayer}`;
    
    cells.forEach(cell => {
        cell.textContent = "";
    });
}

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

resetButton.addEventListener("click", resetGame);