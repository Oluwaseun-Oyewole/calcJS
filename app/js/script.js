const body = document.querySelector('.container1')
const theme = document.querySelector('.theme1')
const toggleIcon = document.querySelector('.toggle-icon')

toggleIcon.addEventListener('click', () => {

    if(body.classList.contains('container1')){
        body.classList.remove('container1')
        theme.classList.remove('theme1')
        body.classList.add('container2')
        theme.classList.add('theme2')
    }

    else if((body.classList.contains('container2'))){
            body.classList.remove('container2')
            theme.classList.remove('theme2')
            body.classList.add('container3')
            theme.classList.add('theme3')
    }

    else if((body.classList.contains('container3'))){
        body.classList.remove('container3')
        theme.classList.remove('theme3')
        body.classList.add('container1')
        theme.classList.add('theme1')
}

})

const calculator = {
    displayValue: '0',
    firstOperand: null,
    isWaitingforSecondOperand: false,
    operator: null,
}

// update the display value
const updateDisplay  = () => {
    
    const display = document.querySelector('.calculator-screen')
    display.value = calculator. displayValue
}

const inputDigit = (digit) => {
    const {displayValue, isWaitingforSecondOperand} = calculator

    if(isWaitingforSecondOperand){
        calculator.displayValue = digit
        calculator.isWaitingforSecondOperand = false;
    }
    // else{
    //     if(displayValue === '0')return calculator.displayValue = digit
    //     return calculator.displayValue = displayValue + digit
    // }
    else{
          //  using ternary operator
    calculator.displayValue = displayValue === '0' ?digit : displayValue + digit
    }
}

const inputDecimal = (dot) => {
    const {isWaitingforSecondOperand} = calculator
        if(isWaitingforSecondOperand){
            calculator.displayValue = '0.'
            calculator.isWaitingforSecondOperand = false
            return
        }
         if (!calculator.displayValue.includes(dot)) {
            calculator.displayValue += dot;
          }
}

const calculate = (n1, operator, n2) => {
    if (operator === '+') return parseFloat(n1) + parseFloat(n2)
    if (operator === '-') return parseFloat(n1) - parseFloat(n2)
    if (operator === 'x') return parseFloat(n1) * parseFloat(n2)
    if (operator === '/') return parseFloat(n1) / parseFloat(n2)

    return n2
  }

const handleOperators =(nextOp) => {

    const {firstOperand, displayValue, operator, isWaitingforSecondOperand } = calculator

    const inputValue = parseFloat(displayValue)

    if(firstOperand & isWaitingforSecondOperand){
        calculator.operator = nextOp

        // console.log(calculator)
        return;
    }

    if(firstOperand === null & !isNaN(inputValue)){
             calculator.firstOperand = inputValue
    }
    else if(operator){
        const result = calculate(firstOperand,  operator, inputValue,);

        calculator.displayValue = `${parseFloat(result.toFixed(5))}`
        calculator.firstOperand = result

    }

 
    calculator.isWaitingforSecondOperand = true;
    calculator.operator = nextOp;

    // console.log(calculator)

}

const resetCalc = () => {

    calculator.displayValue  = '0'
    calculator.firstOperand = null;
    calculator.isWaitingforSecondOperand = false;
    calculator.operator = null;
}

function deleteDigit() {
    calculator.displayValue = calculator.displayValue.substr(0, calculator.displayValue.length - 1) 
}


function back() {
    var value = document.querySelector(".del").value;
    if(value === 'del')
    // document.querySelector(".del").value = value.substr(0, value.length - 1);

    calculator.displayValue = calculator.displayValue.slice(0, -1)
}


// events

const keys = document.querySelector('.calculator-keys')
keys.addEventListener('click', (e) => {

    const {target} = e
    
    if(!target.matches('button')){
        return
    }


    if(target.classList.contains('operator')){
        handleOperators(target.value);
        updateDisplay()
        return;
    }


    if(target.classList.contains('decimal')){
        inputDecimal(target.value)
        updateDisplay()
        return 
    }

    if(target.classList.contains('reset')){
        resetCalc(target.value);
        updateDisplay()
        return
    }

    if(target.classList.contains('del')){

        deleteDigit();
        updateDisplay()
        
    }

    inputDigit(target.value)
    updateDisplay()

})