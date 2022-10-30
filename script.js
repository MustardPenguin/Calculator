let buttons = document.querySelectorAll('button');
let display = document.querySelector('#displayLine');
const MAX_DECIMAL_PLACES = 9;

let operations = {
    "+": function(x, y) { return parseInt(x) + parseInt(y); },
    "-": function(x, y) { return x - y; },
    "x": function(x, y) { return x * y; },
    "/": function(x, y) { return x / y == "Infinity" ? "stop it": x / y; },
    "%": function(x, y) { return x % y; },
    "A/C": function() {
        previousNumber = "";
        currentNumber = "";
        currentOperation = "";
        display.textContent = "0";
        first = true;
    },
    "Round": function(x) {
        return x.toString().length >= 9 ? Math.round( x*Math.pow(10, MAX_DECIMAL_PLACES) ) / Math.pow(10, MAX_DECIMAL_PLACES) : x;
    }
}

let previousNumber = "";
let currentNumber = "";
let currentOperation = "";
let first = true;

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        
        if((button.classList.contains("num") || button.textContent == "+/-") && verifyNum(button.textContent)) {
            if(button.textContent == "+/-") {
                currentNumber = "-" + currentNumber;
            } else {
                if(currentNumber != "" && previousNumber === "" && first === false) {
                    operations['A/C']()
                    currentNumber += button.textContent;
                } else {
                    currentNumber += button.textContent;
                }
                
            }
            
            display.textContent = currentNumber;
        } else {
            if(button.textContent == "A/C") {
                operations['A/C']();
                console.log("Clear");
            } else if (button.textContent === "=") {
                if(currentOperation != "" && operations[currentOperation] && previousNumber != "" && currentNumber != "") {
                    let num = operations[currentOperation](previousNumber, currentNumber);
                    console.log(num);
                    currentNumber = "" + operations["Round"](num);
                    previousNumber = "";
                    currentOperation = "";

                    first = false;
                    display.textContent = operations["Round"](num);
                }
            } else if(currentOperation === "" && button.textContent != "+/-") {
                
                currentOperation = button.textContent;
                previousNumber = currentNumber === "" ? previousNumber : currentNumber;
                
                currentNumber = "";
            } else if(currentOperation != "") {
                console.log(previousNumber);
                if(currentNumber === "") {
                    currentOperation = button.textContent;
                } else {
                    
                    let num = operations[currentOperation](previousNumber, currentNumber)
                    currentNumber = "";
                    previousNumber = "" + operations["Round"](num);
                    currentOperation = button.textContent;
                    first = false;
                    display.textContent = operations["Round"](num);
                }
            }
        }
    })
})

function verifyNum(num) {
    let limit = 9;

    num = num == "+/-" ? "-" : num;
    
    if(num == "0" && currentNumber.length === 0) { return false; }
    if(currentNumber.indexOf(".") > -1) {
        limit++;
        if(num == ".") {
            return false;
        }
    }
    if(currentNumber.indexOf("-") > -1 && num == "-") {
        currentNumber = currentNumber.substring(1);
        display.textContent = currentNumber;
        console.log(currentNumber);
        return false; 
    } else if(num == "-") {
        limit++;
    }
    
    if(currentNumber.length >= limit) { return false; }

    return true;
}

