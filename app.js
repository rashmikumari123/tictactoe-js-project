let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let gameBoard = document.querySelector("main"); // Selects the Tic-Tac-Toe board

let turnX = true; // Player X starts
let clickCount = 0;

const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], 
    [1, 4, 7], [2, 5, 8], [2, 4, 6], 
    [3, 4, 5], [6, 7, 8]
];

// Function to reset the game
const resetGame = () => {
    turnX = true;
    clickCount = 0;
    enableBoxes();

    // Show the game board again
    gameBoard.classList.remove("hide");

    msgContainer.classList.add("hide");
};

// Sound effect for clicking
const clickSound = new Audio('button-pressed-38129.mp3');

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        clickSound.currentTime = 0; // Reset audio time to avoid delay
        clickSound.play().catch(error => console.log("Audio play error:", error));

        if (turnX) {
            box.innerText = "X";
            turnX = false;
        } else {
            box.innerText = "O";
            turnX = true;
        }
        clickCount++;
        box.disabled = true;

        checkWinner();
    });
});

// Function to disable all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Function to enable all boxes
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Function to show the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Player ${winner === "X" ? "1" : "2"} is the winner! 🎉`;

    // Hide the game board when someone wins
    gameBoard.classList.add("hide");

    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Function to check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }
    
    // If all boxes are filled and no winner, it's a draw
    if (clickCount === 9) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");

        // Hide the board in case of a draw
        gameBoard.classList.add("hide");
    }
};

// Event listeners for resetting the game
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
