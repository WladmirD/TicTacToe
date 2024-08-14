const cells = document.querySelectorAll('td');
let currentPlayer = 'X';
let gameOver = false;
let currentMode = 'players';
let cpuTimeout;

// Player movement
function playerMove(selectedCell) {
  if (!gameOver && selectedCell.textContent === '') {
    selectedCell.textContent = currentPlayer;
    checkWin();
    if (!gameOver) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

// CPU Movement
function cpuMove() {
  if (!gameOver) {
    let availableCells = [...cells].filter((cell) => cell.textContent === '');
    if (availableCells.length > 0) {
      let randomIndex = Math.floor(Math.random() * availableCells.length);
      let randomCell = availableCells[randomIndex];
      randomCell.textContent = currentPlayer;
      checkWin();
      if (!gameOver) {
        currentPlayer = 'X';
      }
    }
  }
}

// Calling each movement function based on game mode
function handleClick(cell) {
  if (currentMode === 'players') {
    playerMove(cell);
  } else if (currentMode === 'cpu') {
    playerMove(cell);
    if (!gameOver) {
      clearTimeout(cpuTimeout);
      cpuTimeout = setTimeout(() => {
        cpuMove();
      }, 100);
    }
  }
}

// Setting game mode and adding event listeners
function gameModeSelect(mode) {
  currentMode = mode;

  cells.forEach((cell) => {
    cell.removeEventListener('click', handleCellClick);
    cell.addEventListener('click', handleCellClick);
  });

  function handleCellClick() {
    handleClick(this);
  }
}

const playerBtn = document.getElementById('playerBtn');
const cpuBtn = document.getElementById('cpuBtn');
playerBtn.classList.add('selected');

playerBtn.addEventListener('click', () => {
  gameModeSelect('players');
  playerBtn.classList.add('selected');
  cpuBtn.classList.remove('selected');
});

cpuBtn.addEventListener('click', () => {
  gameModeSelect('cpu');
  playerBtn.classList.remove('selected');
  cpuBtn.classList.add('selected');
});

document.getElementById('reset').addEventListener('click', reset);

function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer
    ) {
      alert(`Player ${currentPlayer} wins!`);
      gameOver = true;
      break;
    }
  }
  if (!gameOver && [...cells].every((cell) => cell.textContent !== '')) {
    alert('Draw!');
    gameOver = true;
  }
}

function reset() {
  cells.forEach((cell) => (cell.textContent = ''));
  gameOver = false;
  currentPlayer = 'X';
  clearTimeout(cpuTimeout);
}

gameModeSelect('players'); // Default mode
