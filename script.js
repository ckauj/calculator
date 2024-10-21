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