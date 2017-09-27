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

$(document).ready(function() {
    console.log("ready");
    $(".but").on("click", e => {
        let entry = $(e.target).text(); 
        console.log(entry, "temp_n", temp_n, "total", total, calc, commands);
        if(entry.match(/^[0-9]+$/)){
            if (frac > 0){
                console.log("power", entry * Math.pow(10, -frac));
                console.log("temp in nums 1", temp_n);
                temp_n += parseFloat(entry) * Math.pow(10, -frac);
                console.log("temp in nums 2", temp_n);
                frac++;
            }
            else {
                temp_n *= 10;
                temp_n += parseFloat(entry);
            }
            console.log("temp_n", temp_n);
            // total = temp_n;
            $("#screen-big").text(temp_n);
            if(calc === "") {
                $("#screen-little").text("");
            }
            // commands.push(entry);
            sym = false;
        }
        else if (entry === ".") {
            console.log(entry);
            temp_n = parseFloat(temp_n.toFixed(1));
            console.log("temp_n", temp_n);
            frac = 1;
            sym = false;
        }
        else if (entry === "C") {
            console.log(entry);
            total = 0;
            commands = [];
            calc = "";
            temp_n = 0;
            printScreen(total, commands.join(" "));
            sym = false;
            frac = 0;
        }
        else if (entry === "DEL") {
            console.log(entry);
            if(temp_n !== 0){
                let mod = temp_n.toString();
                mod = mod.slice(0,mod.length-1);
                temp_n = parseFloat(mod);
            }
            if(sym){
                commands.pop();
            }
            printScreen(temp_n, commands.join(" "));
            // $("#screen-big").text(temp_n);
            sym = false;
            frac = 0;
        }
            // else if (entry === "=") {
            //     console.log(entry);
            //     printScreen();
            //     total = 0;
            //     commands = [];
            //     calc = "";
            //     temp_n = 0;
            //     clear = true;
            // }
        else {
            frac = 0;
            if (sym){
                console.log("double");
                calc = entry;
                commands.pop();
                commands.push(entry);
                printScreen(total, commands.join(" "));
            }
            else if (calc === "") {
                total = temp_n;
                commands.push(temp_n);
                if (entry !== "="){
                    commands.push(entry);
                }
                $("#screen-big").text(total);
                $("#screen-little").text(commands.join(" "));
                calc = entry;
                if ($(e.target).attr('id') === "div") {
                    console.log("divide!");
                    calc = "/";
                }
                temp_n = 0;
                // total += parseFloat(temp_n);
                
            }
            else if (calc === "+") {
                calc = "+";
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
                calc = "-";
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
                calc = "/";
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
                calc = "x";
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
                // console.log("eq", temp_n);
                if (!(commands[commands.length-1] === "=")){
                    commands.push("=");
                }
                commands.push(total);
                printScreen(total, commands.join(" "));
                calc = "";
                // commands.push(entry);
                // total -= parseFloat(temp_n);
                commands = [];
                total = 0;
                temp_n = 0;
            }
            sym = true;
        }
        
    });
});
