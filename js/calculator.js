let total = 0;
let commands = [];
let calc = "";
let temp_n = 0;
let sym = false;
let frac = 0;

const printScreen = (big, small) => {
    $("#screen-big").text(big);
    $("#screen-little").text(small);
}

const clearVal = () => {
    total = 0;
    commands = [];
    calc = "";
    temp_n = 0;
}



$(document).ready(function() {
    $(".but").on("click", e => {
        let entry = $(e.target).text(); 
        if ($(e.target).attr('id') === "div") {
            entry = "/";
        }
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
            frac = 1;
            sym = false;
        }
        else if (entry === "C") {
            clearVal();
            printScreen(total, commands.join(" "));
            sym = false;
            frac = 0;
        }
        else if (entry === "DEL") {
            if(temp_n !== 0){
                if (temp_n < 10) {
                    temp_n = 0;
                }
                else {
                    let mod = temp_n.toString();
                    mod = mod.slice(0,mod.length-1);
                    temp_n = parseFloat(mod);
                }
                
                printScreen(temp_n, commands.join(" "));
            }
            if(sym){
                commands.pop();
                printScreen(total, commands.join(" "));
                calc = "DEL";
            }
            sym = false;
            frac = 0;
        }
        else {
            frac = 0;
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
                commands.push(temp_n);
                if (entry !== "="){
                    commands.push(entry);
                }
                printScreen(total, commands.join(" "));
                calc = entry;
                temp_n = 0;
                
            }
            else if (calc === "+") {
                commands.push(temp_n);
                if (entry !== "="){
                    commands.push(entry);
                }
                total += parseFloat(temp_n);
                printScreen(total, commands.join(" "));
                temp_n = 0;
                calc = entry;
                
            }
            else if (calc === "-") {
                commands.push(temp_n);
                if (entry !== "="){
                    commands.push(entry);
                }
                total -= parseFloat(temp_n);
                printScreen(total, commands.join(" "));
                temp_n = 0;
                calc = entry;
            }
            else if (calc === "/") {
                commands.push(temp_n);
                if (entry !== "="){
                    commands.push(entry);
                }
                total /= parseFloat(temp_n);
                printScreen(total, commands.join(" "));
                temp_n = 0;
                calc = entry;
            }
            else if (calc === "x") {
                commands.push(temp_n);
                if (entry !== "="){
                    commands.push(entry);
                }
                total *= parseFloat(temp_n);
                printScreen(total, commands.join(" "));
                temp_n = 0;
                calc = entry;
            }
            if (entry === "=") {
                if (!(commands[commands.length-1] === "=")){
                    commands.push("=");
                }
                commands.push(total);
                printScreen(total, commands.join(" "));
                clearVal();
            }
            sym = true;
        }
        
    });
});
