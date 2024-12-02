// Check if it's safe to place the number in the given cell
function isSafe(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) return false;
    }

    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) return false;
        }
    }

    return true;
}

// Solve the Sudoku puzzle using backtracking
function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;

                        if (solveSudoku(board)) return true;

                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Generate a fully solved Sudoku board
function generateFullBoard() {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));
    solveSudoku(board);
    return board;
}

// Remove cells to create the puzzle (difficulty determines how many cells to remove)
function removeCells(board, difficulty) {
    let cellsToRemove = difficulty;
    while (cellsToRemove > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (board[row][col] !== 0) {
            board[row][col] = 0;
            cellsToRemove--;
        }
    }
    return board;
}

// Generate a Sudoku puzzle based on difficulty
function generateSudoku(difficulty = 40) {
    const fullBoard = generateFullBoard();
    return removeCells(fullBoard, difficulty);
}

// Render the Sudoku board on the webpage
function renderSudoku(board) {
    const sudokuBoard = document.getElementById("sudoku-board");
    sudokuBoard.innerHTML = ""; // Clear previous board

    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");

            if (cell !== 0) {
                cellDiv.textContent = cell; // Display fixed numbers
                cellDiv.classList.add("filled");
            } else {
                const input = document.createElement("input");
                input.type = "text";
                input.maxLength = "1";
                input.dataset.row = rowIndex;
                input.dataset.col = colIndex;

                // Validate input (only numbers between 1 and 9 are allowed)
                input.addEventListener("input", (event) => {
                    const value = parseInt(event.target.value, 10);
                    if (isNaN(value) || value < 1 || value > 9) {
                        event.target.value = ""; // Clear invalid input
                    }
                });

                cellDiv.appendChild(input); // Append the input box
            }

            sudokuBoard.appendChild(cellDiv); // Add the cell to the board
        });
    });
}

// Event listener for the "Generate Sudoku" button
document.getElementById("generate").addEventListener("click", () => {
    const board = generateSudoku(40); // Difficulty can be adjusted here (higher = easier)
    renderSudoku(board);
});

// Initial render on page load
renderSudoku(generateSudoku(40));