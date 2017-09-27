let total = 0; // current total 
let commands = []; // commands entered
let calc = ""; // operator
let temp_n = 0; // current number
let sym = false; // operator vs digit entered to catch if operator entered multiple times
let frac = 0; // number is a float "." entered

const printScreen = (big, small) => {
    if(small.length > 35 || big.toString().length > 14){
        commands = ["Max digits reached"];
        $("#screen-little").text("Max digits reached");
        clearVal();
        setTimeout( function(){ 
            $("#screen-big").text("");
            $("#screen-little").text("");
          }, 2000 );
    }
    else {
        $("#screen-big").text(big);
        $("#screen-little").text(small);
    }
}

const clearVal = () => {
    total = 0;
    commands = [];
    calc = "";
    temp_n = 0;
}

const updateVal = (val) => {
    commands.push(temp_n);
    if(val !== "="){
        commands.push(val);
    }
    printScreen(total, commands.join(" "));
    temp_n = 0;
    calc = val;
}

const updateFlags = (f, s) => {
    frac = f;
    sym = s;
}

const operatorEntered = (entry) => {
    // to catch if the previous entry was an operator
    if (sym){
        calc = entry;
        commands.pop();
        commands.push(entry);
        printScreen(total, commands.join(" "));
    }
    else if (calc === "DEL") {
        calc = entry;
        commands.push(entry);
        printScreen(total, commands.join(" "));
    }
    else if (calc === "") {
        total = temp_n;
        printScreen(total, commands.join(" "));
        updateVal(entry);
    }
    else if (calc === "+") {
        total += parseFloat(temp_n);
        updateVal(entry);
    }
    else if (calc === "-") {
        total -= parseFloat(temp_n);
        updateVal(entry);
    }
    else if (calc === "/") {
        total /= parseFloat(temp_n);
        updateVal(entry);
    }
    else if (calc === "x") {
        total *= parseFloat(temp_n);
        updateVal(entry);
    }

    if (entry === "=") {
        if (!(commands[commands.length-1] === "=")){
            commands.push("=");
        }
        commands.push(total);
        printScreen(total, commands.join(" "));
        clearVal();
    }
    
    updateFlags(0, true);
}

const calculate = (entry) => {
    if(entry.match(/^[0-9]+$/)){
        if (frac > 0){
            temp_n += parseFloat(entry) * Math.pow(10, -frac);
            frac++;
        }
        else {
            temp_n *= 10;
            temp_n += parseFloat(entry);
        }
        printScreen(temp_n, commands.join(" "));
        sym = false;
    }
    else if (entry === ".") {
        temp_n = parseFloat(temp_n.toFixed(1));
        updateFlags(1, false);
    }
    else if (entry === "C") {
        clearVal();
        printScreen(total, commands.join(" "));
        updateFlags(0, false);
    }
    else if (entry === "DEL") {
        if(temp_n !== 0){
            if (temp_n.toString().length === 1) {
                temp_n = 0;
            }
            else {
                temp_n = parseFloat(temp_n.toString().slice(0,temp_n.toString().length-1));
            }
            printScreen(temp_n, commands.join(" "));
        }
        if(sym){
            commands.pop();
            printScreen(total, commands.join(" "));
            calc = "DEL";
        }
        updateFlags(0, false);
    }
    else {
        operatorEntered(entry);
    }
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
