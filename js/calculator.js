let commands = [];
let calcOn = false;

const operators = {
    '+': function (a, b) { return a + b },
    '-': function (a, b) { return a - b },
    '/': function (a, b) { return a / b },
    'x': function (a, b) { return a * b }
 }

const clearScreen = () => {
    commands = [];
    setTimeout( function(){ 
        $("#screen-big").text("");
        $("#screen-little").text("");
    }, 1000);
}

const printScreen = (big, small) => {
    if(small.length > 30 || big.toString().length > 14){
        $("#screen-little").text("Max digits reached");
        clearScreen();
    }
    else if (big === "hold"){
        $("#screen-little").text(small);
    }
    else {
        $("#screen-big").text(big);
        $("#screen-little").text(small);
    }
}

const calcSwitch = () => {
    $("#AC").toggleClass("off");
    $("#screen").toggleClass("off");
    if ($("#AC").hasClass("off")){
        printScreen("Goodbye", "");
        calcOn = false;
    } else {
        printScreen("Welcome", "");
        calcOn = true;
    }
    clearScreen();
}

const isDigits = () => {
    return /[0-9]+/.test(commands[commands.length - 1]);
}

const calcDigits = (entry) => {
    if(/[0-9]$/.test(entry)){
        if (/[0-9\.]+/.test(commands[commands.length - 1])){
            entry = commands.pop() + entry;
        }
        commands.push(entry);
        printScreen(entry, commands.join(" "));
    }
    else if(entry === "."){
        if (isDigits() && commands[commands.length - 1].indexOf(".") === -1){
            let x = commands.pop();
            commands.push(x + entry);
            printScreen(x + entry, commands.join(" "));
        }
        
    }
    else if(entry === "plusneg"){
        if (isDigits()){
            let x = commands.pop();
            if (/^\-/.test(x)){
                entry = x.slice(1, x.length);
            } 
            else {
                entry = "-" + x;
            }
            commands.push(entry);
            printScreen(entry, commands.join(" "));
        }
    }
}

const calcOperators = (entry) => {
    if (commands.length > 0) {
        let total = parseFloat(commands[0]);  
        if ((/^[\+\-\/\x]$/.test(commands[commands.length - 1]))){
            commands.pop();
            commands.push(entry);
            printScreen("hold", commands.join(" "));
        }
        else {
            if(commands.length > 2){
                for(let i = 1; i <= commands.length - 1; i+=2){
                    total = operators[commands[i]](total, parseFloat(commands[i+1]));
                    if (total.toString().length > 13){
                        total = total.toString().slice(0,14);
                    }
                    printScreen(total, commands.join(" "));
                }
            }
            commands.push(entry);
            printScreen("hold", commands.join(" "));
        }
        if (entry === "="){
            commands = [];
        }
    }          
}

const calculate = (entry) => {
    if (entry === "AC") {
        calcSwitch();
    }
    else {
        if (calcOn){
            if(/([0-9]|\.|plusneg)$/.test(entry)){
                calcDigits(entry);                
            }
            else if(entry === "C"){
                commands = [];
                printScreen("0", "");
            }
            else if(entry === "DEL") {
                if (/[0-9]+/.test(commands[commands.length - 1])){
                    let x = commands.pop();
                    x = x.slice(0,x.length - 1);
                    commands.push(x);
                    printScreen(x, commands.join(" "));
                }
                else {
                    commands.pop();
                    printScreen("hold", commands.join(" "));
                }
            }
            
            else {
                calcOperators(entry); 
        
            }
        }
    }
}

$(document).ready(function() {
    $(".but").on("click", e => {
        let entry = $(e.target).text(); 
        if ($(e.target).attr('id') === "div") {
            entry = "/";
        }
        else if ($(e.target).attr('id') === "plusneg") {
            entry = "plusneg";
        }
        calculate(entry);
    });
});
