let total = 0;
let commands = [];
let calc = "";
let temp_n = 0;
let sym = false;

const printScreen = () => {
    $("#screen-big").text(total);
    $("#screen-little").text(commands.join(""));
}

$(document).ready(function() {
    console.log("ready");
    $(".but").on("click", e => {
        let entry = $(e.target).text(); 
        console.log(entry, "temp_n", temp_n, "total", total, calc, commands);
        if(entry.match(/^[0-9]+$/)){
            temp_n *= 10;
            temp_n += parseInt(entry);

            // total = temp_n;
            $("#screen-big").text(temp_n);
            if(calc === "") {
                $("#screen-little").text("");
            }
            commands.push(entry);
            sym = false;
        }
        else if (entry === ".") {
            console.log(entry);
            total = 0;
            commands = [];
            calc = "";
            temp_n = 0;
            printScreen();
            sym = false;
        }
        else if (entry === "C") {
            console.log(entry);
            total = 0;
            commands = [];
            calc = "";
            temp_n = 0;
            printScreen();
            sym = false;
        }
        else if (entry === "DEL") {
            console.log(entry);
            temp_n = Math.floor(temp_n / 10);
            commands.pop();
            $("#screen-big").text(temp_n);
            sym = false;
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
            if (sym){
                console.log("double");
                calc = entry;
                commands.pop();
                commands.push(entry);
                printScreen();
            }
            else if (calc === "") {
                total = temp_n;
                commands.push(entry);
                $("#screen-big").text(total);
                $("#screen-little").text(commands.join(""));
                calc = entry;
                if ($(e.target).attr('id') === "div") {
                    console.log("divide!");
                    calc = "/";
                }
                temp_n = 0;
                // total += parseInt(temp_n);
                
            }
            else if (calc === "+") {
                calc = "+";
                commands.push(entry);
                total += parseInt(temp_n);
                printScreen();
                temp_n = 0;
                calc = entry;
                
            }
            else if (calc === "-") {
                calc = "-";
                commands.push(entry);
                total -= parseInt(temp_n);
                printScreen();
                temp_n = 0;
                calc = entry;
            }
            else if (calc === "/") {
                calc = "/";
                commands.push(entry);
                total /= parseInt(temp_n);
                printScreen();
                temp_n = 0;
                calc = entry;
            }
            else if (calc === "x") {
                calc = "x";
                commands.push(entry);
                total *= parseInt(temp_n);
                printScreen();
                temp_n = 0;
                calc = entry;
            }
            if (entry === "=") {
                commands.pop();
                printScreen();
                calc = "";
                // commands.push(entry);
                // total -= parseInt(temp_n);
                commands = [];
                total = 0;
                temp_n = 0;
            }
            sym = true;
        }
        
    });
});

// if (calc === "+") {
//     total += parseInt(entry);
//     commands.push(entry);
// }
// else if (calc === "-") {
//     total -= parseInt(entry);
//     commands.push(entry);
// }
// else if (calc === "%") {
//     total /= parseInt(entry);
//     commands.push(entry);
// }
// else if (calc === "x") {
//     total /= parseInt(entry);
//     commands.push(entry);
// }
// else if (calc === "=") {
//     total = entry;
//     commands = [];
// }  