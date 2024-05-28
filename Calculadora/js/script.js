//Pré-Tudo
const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container")
//Calculadora
class Calculator {
   constructor(previousOperationText, currentOperationText) {
     this.previousOperationText = previousOperationText
     this.currentOperationText = currentOperationText
     this.currentOperation = ""
   }
  //Digitar
 addDigit(digit) {
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
     return;
    }
    if(digit === "3.14" && this.currentOperationText.innerText.includes("3.14")){
      return;
    }
    this.currentOperation = digit
    this.updateScreen()
 }

    processOperation(operation) {

        if(this.currentOperationText.innerText === "" && operation != "C") {
            if(this.previousOperationText.innerText !== "") {
               this.changeOperation(operation)
            }
            return
        }

        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;
        //Digitar Operações (+, -, /, *, DEL, Ce, C, =, ^, E)
    switch(operation) {
        case "+":
         operationValue = previous + current 
         this.updateScreen(operationValue, operation, current, previous)
        break;
        
        case "-":
          operationValue = previous - current 
          this.updateScreen(operationValue, operation, current, previous)
         break;
    
        case "/":
         operationValue = previous / current 
         this.updateScreen(operationValue, operation, current, previous)
        break;
        
         case "*":
          operationValue = previous * current 
          this.updateScreen(operationValue, operation, current, previous)
         break;

         case "DEL":
         this.processDelOperator()
         break;

         case "CE":
          this.processClearCurrentOperation()
         break;

         case "C":
          this.processClearAllOperation()
         break;

         case "=":
          this.processEqualOperator()
         break;

         case "^":
          operationValue =  previous ** current
          this.updateScreen(operationValue, operation, current, previous)
         break;

         case "E":
          operationValue = previous * 10 ** current
          this.updateScreen(operationValue, operation, current, previous)
         break;
         case "√":
          operationValue = Math.sqrt(current)
          this.updateScreen(operationValue, operation, current, previous)
         break;
         default:
            return;
    }
    }
    //Modificar Tela
    updateScreen(
        operationValue = null,
         operation = null,
         current = null,
         previous = null) {
        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation
        } else {
           if(previous === 0) {
            operationValue = current
           }
           this.previousOperationText.innerText = `${operationValue} ${operation}`
        this.currentOperationText.innerText = ""
        }
    }
    //Operaçẽs
   changeOperation(operation) {
    const mathOperations = ["*", "/", "+", "-", "^", "E", "√"]

    if(!mathOperations.includes(operation)) {
        return
    }
    this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation

   }
   //Funcionalidade das Operações
     //DEL
   processDelOperator() {
    this.currentOperationText.innerText = 
    this.currentOperationText.innerText.slice(0, -1)
   }
     //CE
   processClearCurrentOperation() {
    this.currentOperationText.innerText = ""
   }
     //C
   processClearAllOperation() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = ""
} 
    //=
   processEqualOperator() {
    const operation = previousOperationText.innerText.split(" ")[1]
  this.processOperation(operation)
}
}
//Botões
const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >=0 || value === ".") {
          calc.addDigit(value)
        } else {
          calc.processOperation(value)
        }

    })
})