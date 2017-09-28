let commands = [];

const operators = {
    '+': function (a, b) { return a + b },
    '-': function (a, b) { return a - b },
    '/': function (a, b) { return a / b },
    'x': function (a, b) { return a * b }
 }

const printScreen = (big, small) => {
    if(small.length > 30 || big.toString().length > 14){
        commands = ["Max digits reached"];
        $("#screen-little").text("Max digits reached");
        commands = [];
        setTimeout( function(){ 
            $("#screen-big").text("");
            $("#screen-little").text("");
          }, 2000 );
    }
    else if (big === "hold"){
        $("#screen-little").text(small);
    }
    else {
        $("#screen-big").text(big);
        $("#screen-little").text(small);
    }
}

const calculate = (entry) => {
    if(/[0-9]$/.test(entry)){
        if (/[0-9\.]+/.test(commands[commands.length - 1])){
            let x = commands.pop();
            entry = x + entry;
        }
        commands.push(entry);
        printScreen(entry, commands.join(" "));
    }
    else if(entry === "."){
        if (/[0-9]+/.test(commands[commands.length - 1]) && commands[commands.length - 1].indexOf(".") === -1){
            let x = commands.pop();
            entry = x + entry;
            commands.push(entry);
            printScreen(entry, commands.join(" "));
        }
        
    }
    else if(entry === "DEL") {
        if (/[0-9\.]+/.test(commands[commands.length - 1])){
            let x = commands.pop();
            entry = x.slice(0,x.length - 1);
            commands.push(entry);
            printScreen(entry, commands.join(" "));
        }
        else {
            commands.pop();
            printScreen("hold", commands.join(" "));
        }
    }
    else if(entry === "C"){
        commands = [];
        printScreen("", "");
    }
    else {
        if (commands.length > 0) {
            let total = parseFloat(commands[0]);  
            console.log("total: ", total);
            if ((/[\+\-\/\x]/.test(commands[commands.length - 1]))){
                commands.pop();
                commands.push(entry);
                printScreen("hold", commands.join(" "));
            }
            else {
                if(commands.length > 2){
                    console.log("reached");
                    for(let i = 1; i <= commands.length - 1; i+=2){
                        console.log("i:", i);
                        total = operators[commands[i]](total, parseFloat(commands[i+1]));
                        if (total.toString().length > 13){
                            total = total.toString().slice(0,14);
                        }
                        console.log(total);
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
    console.log(commands);
}

$(document).ready(function() {
    $(".but").on("click", e => {
        let entry = $(e.target).text(); 
        if ($(e.target).attr('id') === "div") {
            entry = "/";
        }
        calculate(entry);
        
    });
});
