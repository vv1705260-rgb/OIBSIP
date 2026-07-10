// ===============================
// Modern Calculator - OIBSIP
// Developed by Vaishali B
// ===============================

const display = document.getElementById("display");
const history = document.getElementById("history");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

// ===============================
// Update Display
// ===============================

function updateDisplay() {
    display.value = currentInput || "0";
}

// ===============================
// Handle Numbers
// ===============================

function inputNumber(number) {

    if (waitingForSecondNumber) {
        currentInput = number;
        waitingForSecondNumber = false;
    } else {
        currentInput += number;
    }

    updateDisplay();
}

// ===============================
// Handle Decimal
// ===============================

function inputDecimal() {

    if (waitingForSecondNumber) {
        currentInput = "0.";
        waitingForSecondNumber = false;
        updateDisplay();
        return;
    }

    if (!currentInput.includes(".")) {
        currentInput += currentInput === "" ? "0." : ".";
    }

    updateDisplay();
}

// ===============================
// Clear
// ===============================

function clearCalculator() {

    currentInput = "";
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;

    history.textContent = "";

    updateDisplay();

}

// ===============================
// Backspace
// ===============================

function backspace() {

    currentInput = currentInput.slice(0, -1);

    updateDisplay();

}

// ===============================
// Calculate
// ===============================

function calculate(first, second, operator) {

    switch (operator) {

        case "+":
            return first + second;

        case "-":
            return first - second;

        case "*":
            return first * second;

        case "/":

            if (second === 0) {

                alert("Cannot divide by zero!");

                return first;

            }

            return first / second;

        case "%":
            return first % second;

        default:
            return second;

    }

}

// ===============================
// Handle Operators
// ===============================

function handleOperator(nextOperator) {

    const inputValue = parseFloat(currentInput);

    if (firstNumber === null) {

        firstNumber = inputValue;

    } else if (!waitingForSecondNumber) {

        const result = calculate(firstNumber, inputValue, operator);

        currentInput = String(Number(result.toFixed(10)));

        firstNumber = result;

        updateDisplay();

    }

    waitingForSecondNumber = true;

    operator = nextOperator;

    history.textContent = `${firstNumber} ${operator}`;

}

// ===============================
// Equal
// ===============================

function handleEqual() {

    if (operator === null || waitingForSecondNumber) return;

    const secondNumber = parseFloat(currentInput);

    const result = calculate(firstNumber, secondNumber, operator);

    history.textContent =
        `${firstNumber} ${operator} ${secondNumber} =`;

    currentInput = String(Number(result.toFixed(10)));

    operator = null;

    firstNumber = null;

    waitingForSecondNumber = false;

    updateDisplay();

}

// ===============================
// Button Events
// ===============================

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.dataset.value;

        if (!isNaN(value)) {

            inputNumber(value);

            return;

        }

        switch (value) {

            case ".":
                inputDecimal();
                break;

            case "+":
            case "-":
            case "*":
            case "/":
            case "%":
                handleOperator(value);
                break;

            case "=":
                handleEqual();
                break;

            case "C":
                clearCalculator();
                break;

            case "backspace":
                backspace();
                break;

        }

    });

});

// ===============================
// Keyboard Support
// ===============================

document.addEventListener("keydown", (event) => {

    const key = event.key;

    if (!isNaN(key)) {

        inputNumber(key);

    }

    else if (key === ".") {

        inputDecimal();

    }

    else if (["+", "-", "*", "/", "%"].includes(key)) {

        handleOperator(key);

    }

    else if (key === "Enter") {

        event.preventDefault();

        handleEqual();

    }

    else if (key === "Backspace") {

        backspace();

    }

    else if (key === "Escape") {

        clearCalculator();

    }

});

updateDisplay();
