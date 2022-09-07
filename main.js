// global variables //
let current = "";  
let previous = ""
let operator = "";

window.addEventListener("keydown", handleKeyPress); // to handle calculator with buttons //

// variables for queryselectors // 
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalButton = document.querySelector("[data-equal]");
const previousScreen = document.querySelector("[data-previous]");
const currentScreen = document.querySelector("[data-current]");
const decimalButton = document.querySelector("[data-decimal]");

numberButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        handleNumber(e.target.textContent);
    });
});
function handleNumber(num) {  // to handle operators //
      if (current.length <= 11) {
        current += num;
        currentScreen.textContent = current;
      }
}
operationButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        handleOperator(e.target.textContent);
    });
});
function handleOperator(op) { // to handle operators //
    if (previous === "") {
        previous = current;
        operatorCheck(op);
    }
   else {
        calculate();
        operator = op;
        currentScreen.textContent = current;
        previousScreen.textContent = previous + " " + op;
        current = "";
        currentScreen.textContent = "";
        }
    }
function operatorCheck (text) {
    operator = text;
    previousScreen.textContent = previous + " " + text;
    current = "";
    currentScreen.textContent = "";
}
equalButton.addEventListener("click", () => {
    if (current !== "" && previous !== "") {
        return calculate();
    }
});
function calculate() { // caculate data //
    current = Number(current);
    previous = Number(previous);
    if(operator === "+") {
        previous += current;
    }
    else if (operator === "-") {
        previous -= current;
    }
    else if (operator === "*") {
        previous *= current;
    }
    else if (operator === "/") {
        if (current <= 0) {
            currentScreen.textContent = "Error";
            previousScreen.textContent ="";
            operator = "";
            return;
        }
        previous /= current;
    }
    previous = roundNumber(previous);
    previousScreen.textContent = "";
    currentScreen.textContent = previous;
}
function roundNumber (num) {
    return Math.round(num * 1000000) / 1000000
}
clearButton.addEventListener("click", clearAll);
function clearAll () {
    previous = "";
    current = "";
    operator = "";
    previousScreen.textContent = "";
    currentScreen.textContent = "";
}
decimalButton.addEventListener("click", () => {
    decimalNumber();
});
function decimalNumber() {
    if(!current.includes(".")) {
        current += "."
        currentScreen.textContent = current;
    }
}
function handleKeyPress (e) { // function to handle keys //
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9) {
        handleNumber(e.key);
    }
    if (e.key === "Enter" || (e.key === "=" & current !== "" & previous !== "")) {
        calculate();
    }
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        handleOperator(e.key);
    }
    if (e.key === ".") {
        decimalNumber();
    }
    if (e.key === "Backspace") {
        handleDelete();
    }
}

    deleteButton.addEventListener("click", handleDelete);

    function handleDelete() {
        if (current !== "") {
            current = current.slice(0,-1);
            currentScreen.textContent = current;
            if (current === "") {
                currentScreen.textContent = "0"
            }          
        }
    }


    

    
