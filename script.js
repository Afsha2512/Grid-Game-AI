const board = document.getElementById("board");
const statusText = document.getElementById("status");

let cells = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// Create board
function createBoard() {
  board.innerHTML = "";
  cells.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(index));
    board.appendChild(cell);
  });
}

// Player click
function handleClick(index) {
  if (cells[index] !== "" || !gameActive) return;

  cells[index] = "X";
  render();

  if (checkWin("X")) {
    statusText.innerText = "🎉 You Win!";
    gameActive = false;
    return;
  }

  if (!cells.includes("")) {
    statusText.innerText = "😐 Draw!";
    gameActive = false;
    return;
  }

  statusText.innerText = "🤖 Computer Thinking...";
  setTimeout(computerMove, 500);
}

// 🤖 Smart AI move
function computerMove() {
  let bestMove = -1;

  // Try winning move
  for (let i = 0; i < 9; i++) {
    if (cells[i] === "") {
      cells[i] = "O";
      if (checkWin("O")) {
        bestMove = i;
      }
      cells[i] = "";
    }
  }

  // Block player
  if (bestMove === -1) {
    for (let i = 0; i < 9; i++) {
      if (cells[i] === "") {
        cells[i] = "X";
        if (checkWin("X")) {
          bestMove = i;
        }
        cells[i] = "";
      }
    }
  }

  // Random fallback
  if (bestMove === -1) {
    let empty = cells
      .map((v, i) => v === "" ? i : null)
      .filter(v => v !== null);
    bestMove = empty[Math.floor(Math.random() * empty.length)];
  }

  cells[bestMove] = "O";
  render();

  if (checkWin("O")) {
    statusText.innerText = "💀 Computer Wins!";
    gameActive = false;
    return;
  }

  if (!cells.includes("")) {
    statusText.innerText = "😐 Draw!";
    gameActive = false;
    return;
  }

  statusText.innerText = "Your Turn";
}

// Render board
function render() {
  const allCells = document.querySelectorAll(".cell");
  allCells.forEach((cell, i) => {
    cell.innerText = cells[i];
  });
}

// Check win
function checkWin(player) {
  return winPatterns.some(pattern =>
    pattern.every(i => cells[i] === player)
  );
}

// Reset
function resetGame() {
  cells = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.innerText = "Your Turn";
  createBoard();
}

createBoard();