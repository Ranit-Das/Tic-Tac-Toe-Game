let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgCon = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn0 = true;
let count =0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was clicked.");
        if(turn0) {
            box.innerText = "0";
            box.classList.remove("color_X");
            box.classList.add("color_0");
            turn0 = false;
        } else {
            box.innerText = "X";
            box.classList.remove("color_0");
            box.classList.add("color_X");
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
        count++;

        let check = checkWinner();
        if(count === 9 && !check) {
            showDraw();
        }
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
    count = 0;
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
    count = 0;
};

const resetBtn = () => {
    turn0 =true;
    enableBoxes();
    msgCon.classList.add("hide");
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgCon.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = `This match is Draw ! Try Again`;
    msgCon.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(pattern of winPatterns) {
        // console.log(pattern[0], pattern[1], pattern[2]);
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        // console.log(pos1, pos2, pos3);
        
        if(pos1 != "" && pos2 != "" && pos3 != "") {
            if(pos1 == pos2 && pos2 == pos3) {
                console.log("Winner ->",pos1, "at position", pattern[0], pattern[1], pattern[2]);
                disableBoxes();
                showWinner(pos1);
                return true;
            }
        }
    }
};

newBtn.addEventListener("click", resetBtn);
reset.addEventListener("click", resetBtn);
