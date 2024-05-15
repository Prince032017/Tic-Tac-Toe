let boxes = document.querySelectorAll(".box");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let newButton = document.querySelector(".new-btn");
let resetButton = document.querySelector(".reset-btn");

let turnO = true; //bydefault set the first turn for player 'O'
let count = 0; //intialize count for tracking number of moves

let winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

//this function shows the winner msg on screen
const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
}

//if out of moves situation and there is no winner
const draw = () => {

    msg.innerText = "Oops! out of moves.."
    msgContainer.classList.remove("hide");

}

//if  winner is decalred then we have to disable rest of the boxes.
const disableBoxes = () => {
    for (box of boxes) {
        box.disabled = true;
    }
}

//for starting or reset the game
const enableBoxes = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
    count=0;
    msgContainer.classList.add("hide");
}

//function to check the winner
const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                disableBoxes();
                showWinner(pos1val);
            }
            if(count===9 && pos1val!==pos2val){
                draw();
            }
        }
    }

}

//add the event lister "click" 
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true
        }
        count++
        box.disabled = true;
        checkWinner();
    })
})

//new game button
newButton.addEventListener("click", enableBoxes);

//reset button
resetButton.addEventListener("click", enableBoxes);

