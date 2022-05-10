class Calculator {
    constructor(prevOperand, currOperand) {
        this.prevOperand = prevOperand
        this.currOperand = currOperand
        this.clear()
    }

    clear() {
        this.prevOperand = ''
        this.currOperand = ''
        this.operation = undefined
    }
    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }
    changeSign() {
        if (this.currOperand === '') return
        if (this.currOperand.toString().charAt(0) === '-') {
            this.currOperand = this.currOperand.toString().slice(1)
        } else {
            this.currOperand = '-' + this.currOperand.toString()
        }
    }
    appendNumber(number) {
        if (number === '.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString()
    }
    chooseOperation(operation) {
        if (this.currOperand === '') return
        if (this.prevOperand !== '') this.calculate()

        this.operation = operation
        this.prevOperand = this.currOperand + operation
        this.currOperand = ''
    }
    calculate() {
        let result = 0
        const prev = parseFloat(this.prevOperand)
        const curr = parseFloat(this.currOperand)

        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                result = prev + curr
                break
            case '-':
                result = prev - curr
                break
            case '×':
                result = prev * curr
                break
            case '÷':
                if (curr == '0') {
                    result = 'error'
                } else {
                    result = prev / curr
                }
                break
            default:
                return
        }
        this.operation = undefined
        this.prevOperand = ''
        this.currOperand = result
    }
    updateDisplay() {
        prevOperandText.innerHTML = this.prevOperand
        currOperandText.innerText = this.currOperand
    }
}

const numberBtn = document.querySelectorAll('[data-number]')
const operationBtn = document.querySelectorAll('[data-operation]')

const prevOperandText = document.querySelector('[data-prev-operand]')
const currOperandText = document.querySelector('[data-curr-operand]')

const acBtn = document.querySelector('[data-all-clear]')
const delBtn = document.querySelector('[data-delete]')
const signBtn = document.querySelector('[data-sign]')
const equalBtn = document.querySelector('[data-equals]')

const calculator = new Calculator(prevOperandText, currOperandText)

numberBtn.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationBtn.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

acBtn.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

delBtn.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

signBtn.addEventListener('click', () => {
    calculator.changeSign()
    calculator.updateDisplay()
})

equalBtn.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateDisplay()
})
