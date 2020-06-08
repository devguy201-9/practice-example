class Calculater{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement=previousOperandTextElement
        this.currentOperandTextElement=currentOperandTextElement
        this.flag=0;
        this.clear()
    }
    clear(){
        this.currentOperand=''
        this.previousOperand=''
        this.operation=undefined
        this.previousOperandTextElement.innerText=''
    }
    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        if(this.flag==1){
            number=-number
            this.flag=0;
        }
        this.currentOperand=this.currentOperand.toString() + number.toString()
    }
    chooseOperand(operation){
        if(this.currentOperand === '' && operation=='-') this.flag=1
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') this.compute()
        this.operation=operation
        this.previousOperand=this.currentOperand
        this.currentOperand=''
    }
    compute(){
        let result
        const prev=parseFloat(this.previousOperand)
        const current=parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                result=prev+current
                break
            case '-':
                result=prev-current
                break
            case '*':
                result=prev*current
                break
            case '÷':
                result=prev/current
                break
            default:
                return
        }
        this.currentOperand=result
        this.operation=undefined
        this.previousOperand=''
    }
    getDisplayNumber(number){  
        const floatNumber = parseFloat(number);
        if(isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('en')
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText=
            this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousOperandTextElement.innerText=
                `${this.previousOperand} ${this.operation}`
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-math]')
const currentOperandTextElement = document.querySelector('[data-current-math]')

const calculater = new Calculater(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculater.appendNumber(button.innerText)
        calculater.updateDisplay()
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculater.chooseOperand(button.innerText)
        calculater.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculater.compute()
    calculater.updateDisplay()
})
allClearButton.addEventListener('click', () => {
    calculater.clear()
    calculater.updateDisplay()
})
deleteButton.addEventListener('click', () => {
    calculater.delete()
    calculater.updateDisplay()
})