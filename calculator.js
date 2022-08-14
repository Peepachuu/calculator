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
    x = Number(x);
    y = Number(y);
    let result = roundTo(operators[operator](x, y), preciseTo);
    let screen = document.querySelector(".screen");
    screen.textContent = result;
    firstNumber = "" + result;
    secondNumber = "";
}

function displayOnScreen(numOp) {
    screen = document.querySelector(".screen");
    if ("+-÷×".includes(numOp)) {
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
    /*chcek if op
    then check if there is a second number
    if there is do the current operation on the first number and second number and add it to the screen
    if not then set op to the current op and add it to the screen
    if not op
    check if currentOp
    if it is then add it to that
    if not add it to the first number
    */
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
    // remove last item in the textContent of screen.
    // if it's an operator change currentOp
    // if first/second number update that
}

function allClear() {
    // clear everything i.e current op first number and second number update screen
    currentOp = "";
    firstNumber = "";
    secondNumber = "";
    const screen = document.querySelector(".screen");
    screen.textContent = "";
}