let firstNumber = "";
let secondNumber = "";
let currentFunction = "";

const currentCalculation = document.querySelector("#current-calculation");

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
    if (firstNumber === "" && currentFunction === "") {
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
        }
    }
}

function deleteCharacter () {
    if (secondNumber !== "") {

    } else if (currentFunction !== "") {

    } else if (firstNumber !== "") {
        firstNumber = firstNumber.slice(0, -1);
        currentCalculation.textContent = currentCalculation.textContent.slice(0, -1);
    }

    if (firstNumber === "") {
        currentCalculation.textContent = '0';
    }
}

function setFunction(fn) {
    const newFunction = document.querySelector(`#${fn}`);
    if (firstNumber === "" && currentFunction === "") {
        firstNumber = 0;
    }

    calculate();
    currentFunction = fn;
    currentCalculation.textContent += ` ${newFunction.textContent} `;
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
                currentCalculation.textContent = 'Cannot divide by 0';
                firstNumber = "";
                secondNumber = "";
                currentFunction = "";
            } else {
                total = +firstNumber / +secondNumber;
            }
            break;
    }

    firstNumber = total;
    secondNumber = "";
    currentCalculation.textContent = total;
}