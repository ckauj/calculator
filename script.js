let firstNumber = "";
let secondNumber = "";
let currentFunction = "";
let calculated = false;

const currentCalculation = document.querySelector("#current-calculation");
const previousCalculation = document.querySelector("#previous-calculation");

const buttons = document.querySelectorAll("button");
for (const button of buttons) {
    button.addEventListener('click', function() {
        if (button.className === 'digit') {
            concatDigits(button.textContent);
        } else if (button.className === 'function') {
            setFunction(button.id);
        } 
        else {
            switch(button.id) {
                case 'reset':
                    reset();
                    break;
                case 'delete':
                    deleteCharacter();
                    break;
                case 'equal':
                    calculate();
                    break;
                case 'decimal':
                    addDecimal();
                    break;
            }
        }

    });
}

function concatDigits(digit) {
    if ((firstNumber === "" || calculated) && currentFunction === "") {
        reset();
        currentCalculation.textContent = digit;
        firstNumber += digit;
    } else {
        if (currentFunction === "") {
            firstNumber += digit;
        } else {
            secondNumber += digit;
        }
        currentCalculation.textContent += digit;
    }
}

function reset(){
    firstNumber = "";
    secondNumber = "";
    currentFunction = "";
    currentCalculation.textContent = "0";
    previousCalculation.textContent = "";
    calculated = false;
}

function addDecimal() {
    if (firstNumber === "") {
        firstNumber = '0.';
        currentCalculation.textContent += '.';
    } else if (currentFunction === "") {
        if (!firstNumber.includes('.')) {
            firstNumber += '.';
            currentCalculation.textContent += '.';
        }
    } else if (secondNumber === "") {
        secondNumber = '0.';
        currentCalculation.textContent += '0.';
    } else {
        if (!secondNumber.includes('.')) {
            secondNumber += '.';
            currentCalculation.textContent += '.';
        }
    }
}

function deleteCharacter () {
    if (secondNumber !== "") {
        secondNumber = secondNumber.slice(0, -1);
        currentCalculation.textContent = currentCalculation.textContent.slice(0, -1);
    } else if (firstNumber !== "" && currentFunction === "") {
        firstNumber = firstNumber.slice(0, -1);
        currentCalculation.textContent = currentCalculation.textContent.slice(0, -1);
    }

    if (firstNumber === "") {
        currentCalculation.textContent = '0';
    }
}

function setFunction(fn) {
    const newFunction = document.querySelector(`#${fn}`);

    calculated = false;
    if (firstNumber === "" && currentFunction === "") {
        firstNumber = 0;
    } else if (currentFunction !== "" && secondNumber === "") {
        previousCalculation.textContent = previousCalculation.textContent.slice(0, -3);
    }

    calculate();
    previousCalculation.textContent = `${firstNumber} ${newFunction.textContent} `;
    currentCalculation.textContent = "";
    currentFunction = fn;
}

function calculate() {
    if (firstNumber === "" || secondNumber === "" || currentFunction === "") {
        return;
    }

    let total = 0;
    switch (currentFunction) {
        case 'add':
            total = +firstNumber + +secondNumber;
            break;
        case 'subtract':
            total = +firstNumber - +secondNumber;
            break;
        case 'multiply':
            total = +firstNumber * +secondNumber;
            break;
        case 'divide':
            if (secondNumber === '0') {
                reset();
                currentCalculation.textContent = 'Cannot divide by 0';
                return;
            } else {
                total = +firstNumber / +secondNumber;
            }
            break;
    }

    firstNumber = total;
    previousCalculation.textContent += secondNumber;
    secondNumber = "";
    currentFunction = "";
    currentCalculation.textContent = total;
    calculated = true;
}