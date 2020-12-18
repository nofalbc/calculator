//Selector Variables//
const buttons = document.querySelectorAll('button');
let display = document.querySelector('.screen');
let displayValue = '0';
let firstNumber = null;
let secondNumber = null;
let firstOperator = null;
let secondOperator = null;

//Screen//
function updateScreen(){
    display.innerText = displayValue;
    if (displayValue.length > 9){
        display.innerText = displayValue.substring(0, 9);
    }
}
updateScreen();

//Buttons//
function clickButton() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            if(buttons[i].classList.contains('number')) {
                inputNumber(buttons[i].value);
                updateScreen();
            } else if(buttons[i].classList.contains('operator')) {
                inputOperator(buttons[i].value);
            } else if(buttons[i].classList.contains('equals')) {
                inputEquals();
                updateScreen();
            } else if(buttons[i].classList.contains('decimal')) {
                inputDecimal(buttons[i].value);
                updateScreen();
            } else if(buttons[i].classList.contains('percent')) {
                inputPercent(displayValue);
                updateScreen();
            } else if(buttons[i].classList.contains('sign')) {
                inputSign(displayValue);
                updateScreen();
            } else if(buttons[i].classList.contains('clear'))
                clearDisplay();
                updateScreen();
        }
    )}
}
clickButton();

function inputNumber(number){
    if(firstOperator === null){
        if (displayValue === '0' || displayValue === 0){
            displayValue = number;
        } else if(displayValue === firstNumber){
            displayValue = number;
        } else {
            displayValue += number;
        }
    } else {
        if(displayValue === firstNumber){
            displayValue = number;
        } else{
            displayValue += number;
        }
    }
}
function inputOperator(operator){
    if(firstOperator != null && secondOperator === null){
        secondOperator = operator;
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), firstOperator);
        displayValue = result.toString();
        firstNumber = displayValue;
        result = null;
    } else if(firstOperator != null && secondOperator != null){
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), secondOperator);
        secondOperator = operator;
        displayValue = result.toString();
        firstNumber = displayValue;
        result = null;
        
    } else{
        firstOperator = operator;
        firstNumber = displayValue;
    }
}
function inputEquals(){
    if(firstOperator === null){
        displayValue = displayValue;
    } else if(secondOperator != null){
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), secondOperator);
        if(result === 'NOPE'){
            displayValue ='NOPE';
        } else{
            displayValue = result.toString();
            firstNumber =displayValue;
            secondNumber = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), firstOperator);
        if(result === 'NOPE'){
            displayValue ='NOPE';
        } else {
            displayValue = result.toString();
            firstNumber =displayValue;
            secondNumber = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}
function inputDecimal(dot){
    if(displayValue === firstNumber || displayValue === secondNumber){
        displayValue = '0';
        displayValue += dot;
    } else if(!displayValue.includes(dot)){
        displayValue += dot;
    }
}
function inputPercent(num){
    displayValue = (num/100).toString();
}
function inputSign(num){
    displayValue = (num * -1).toString(); 
}
function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}
//Math//
function operate(x, y, oper){
    if (oper ==='+'){
        return x + y;
    } else if (oper === '-'){
        return x - y;
    } else if(oper === '*'){
        return x * y;
    } else if(oper === '/'){
        if (y === 0){
        return 'NOPE';
        } else{
           return x / y;
        }
    }
}