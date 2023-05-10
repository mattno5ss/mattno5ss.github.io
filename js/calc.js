const num_buttons = document.querySelectorAll("button.number");
const op_buttons = document.querySelectorAll("button.operator");
const previous = document.querySelector(".previous-display");
const current = document.querySelector(".current-display");
let first_num = null;
let second_num = null;
let operator = null;
let clear = false;

num_buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        if (clear || current.textContent == "0") {
            clearCurrent();
        }
        current.textContent += event.target.textContent;
    })
});

op_buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        if (operator != null) {
            operate();
        }
        operator = event.target.textContent;
        previous.textContent = `${current.textContent} ${operator}`;
        first_num = parseFloat(current.textContent);
        clear = true;
    })
})

function decimal() {
    if (clear) {
        clearCurrent();
    }
    if (current.textContent == "") {
        current.textContent = "0";
    }
    if (current.textContent.includes(".")) {
        return;
    }
    current.textContent += ".";
}

function clearCurrent() {
    current.textContent = "";
    clear = false;
}

function allClear() {
    previous.textContent = "";
    current.textContent = "0";
    first_num = null;
    second_num = null;
    operator = null;
}

function backspace() {
    current.textContent = current.textContent.slice(0, -1);
}

function operate() {
    if (operator == null || clear) {
        return;
    }
    let result;
    second_num = parseFloat(current.textContent);
    previous.textContent = `${first_num} ${operator} ${second_num} =`;

    switch (operator) {
        case "^":
            result = first_num ** second_num;
            break;
        case "+":
            result = first_num + second_num;
            break;
        case "-":
            result = first_num - second_num;
            break;
        case "*":
            result = first_num * second_num;
            break;
        case "/":
            if (second_num == 0) {
                allClear();
                return alert("Cannot divide by 0!");
            } else {
                result = first_num / second_num;
                break;
            }
        default:
            return alert("Error!");
    }
    current.textContent = result;
    operator = null;
    clear = true;
}