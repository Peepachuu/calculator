let firstNumber = "";
let secondNumber = "";
let currentOp = "";
const preciseTo = 1000;
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

const operators = {
    "+": add,
    "-": subtract,
    "×": multiply,
    "÷": divide,
};
function operate(operator, x, y) {
    if (operator == "" || x == "" || y == "")
        return;
    
    if (operator == "÷" && y == "0") {
        alert("The math gods don't allow division by 0!")
        return;
    }
    x = Number(x);
    y = Number(y);
    let result = roundTo(operators[operator](x, y), preciseTo);
    let screen = document.querySelector(".screen");
    screen.textContent = result;
    firstNumber = "" + result;
    currentOp = "";
    secondNumber = "";
}

function displayOnScreen(numOp) {
    screen = document.querySelector(".screen");
    if (numOp == ".") {
        if (currentOp == "") {
            if (firstNumber.includes("."))
                return;
            firstNumber += numOp;
            screen.textContent = firstNumber;
        } else {
            if (secondNumber.includes("."))
                return;
            secondNumber += numOp;
            screen.textContent = firstNumber + currentOp + secondNumber;
        }
    }
    else if ("+-÷×".includes(numOp)) {
        if (secondNumber == "") {
            currentOp = numOp;
            screen.textContent = firstNumber + numOp;
        } else {
            operate(currentOp, firstNumber, secondNumber);
            currentOp = numOp;
            screen.textContent = firstNumber + currentOp;
        }
    } else {
        if (currentOp == "") {
            firstNumber += numOp;
            screen.textContent = firstNumber;
        } else {
            secondNumber += numOp;
            screen.textContent = firstNumber + currentOp + secondNumber;
        }
    }
}


displayOnScreen("0");

function linkButtons() {
    allNumOps = document.querySelectorAll(".row button");
    allNumOps.forEach(numOp => {
        if (numOp.textContent == "=") {
            numOp.addEventListener('click', () => {operate(currentOp, firstNumber, secondNumber);});
        }
        else {
            numOp.addEventListener('click', (e) => {displayOnScreen(e.target.textContent);});
        }
    });
}

function roundTo(x, precision) {
    return Math.round(x * precision)/precision;
}

linkButtons();

document.querySelector(".undo").addEventListener('click', undo);
document.querySelector(".clear").addEventListener('click', allClear);

function undo() {
    if (secondNumber != "") {
        secondNumber = secondNumber.slice(0, -1);
    } else if (currentOp != "") {
        currentOp = "";
    } else if (firstNumber != "") {
        firstNumber = firstNumber.slice(0, -1);
    }
    document.querySelector(".screen").textContent = firstNumber + currentOp + secondNumber;
}

function allClear() {
    currentOp = "";
    firstNumber = "";
    secondNumber = "";
    const screen = document.querySelector(".screen");
    screen.textContent = "";
}

//TODO change style some more
//TODO add decimal functionality
//TODO add keyboard functionality
