let buttons = document.querySelectorAll('button');
let display = document.querySelector('#displayLine');

let add = (x, y) => x + y;
let subtract = (x, y) => x - y;
let multiple = (x, y) => x * y;
let divide = (x, y) => y === 0 ? "stop it" : x / y;

let previousNumber;

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if(button.classList.contains("num")) {
            
            display.textContent = button.textContent;
        } else {
            console.log("no");
        }
    })
})

function clear() {

}