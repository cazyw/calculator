# Calculator App
Free Code Camp Advanced Project - Jacascript Calculator App

https://cazyw.github.io/calculator/

## Objective

Build an app that is functionally similar to this: https://codepen.io/FreeCodeCamp/full/rLJZrA/.

1. I can add, subtract, multiply and divide two numbers.
2. I can clear the input field with a clear button.
3. I can keep chaining mathematical operations together until I hit the equal button, and the calculator will tell me the correct output.

## Operating Instructions

<img src="https://cazyw.github.io/img/js-calculator.jpg" width="450" alt="calculator">


The calculator has the following buttons:
* `AC` switches the calculator on and off (screen switches on and off)
* `C` clears the screen
* `DEL` deletes the input
* `0-9` usual digits
* `.` decimal place
* `+ - / x =` usual operators
* `t (plus-minus)` allows negative numbers

The screen displays two lines of information:

1. Digits entered or the running total
2. All the commands that have been entered so far

Features of the calculator:

* Ability to switch the calculator on and off
* The usual addition, subtraction, multiplication, division 
* Ability to include negative numbers and decimal numbers
* Notifies if the actual number or the number of commands has reached the limit (14 digits on the main screen or 30 chars in the command line)

## Discussion

### Operations

The first part of the exercise involved working out how the calculator should operate - how to capture the input so that operations could be performed on the input. 

In the first iteration, a number of different variables were used to store the commands, a running total and the last operator entered. The calculations would then be applied on the fly with a running total kept. Generally this worked, however problems arose particularly around using decimal points (switching between integers and floats and deleting numbers with decimal points). The code was also quite complicated with various flags for whether the last key entered was a digit or operator and flags for fractions.

The code was then refactored (pretty much overhauled) with the main driver  being that instead of if/else statements used to capture each operator, how operators were called should be more dynamic. I discovered that I could store operator functions as key value pairs in an object. That way calling `operator['+'](total, num)` would run the actual calculation of adding num to the total.

One big decision was how to store the data so that it could be easily manipulated. Having multiple variables holding the status of various pieces of data was inefficient and made things difficult when decimals, deletion and negative numbers were involved. In the end, I decided that simply pushing the digit/operator into an array was the simplest way to store the data. The running total on the big screen would be re-calculated each time (looping through the array). Although inefficient as the total is recalculated each time a new operator is entered, the data entered is limited and so it was simpler to calculate the total this way. It made it much easier to handle decimal and negative numbers and deletion.

The final steps were to separate the code into smaller functions and create functions where particular code was being repeated (e.g. printing to the screen). I also added limitations to the maximum ammount of commands that could be entered so data would not run off the screen.

### Design

The calculator skeleton was designed using the bootstrap 3 grid layout.

Box shadowing and transform was used to create the 3D buttons and the button depress effect on click. Linear gradient was added to the buttons for added texture. A brushed metal background was selected for the calculator background and additional inset and external box shadowing added to give the calculator a bit of a 3D effect.

In order to signal the calculator's on/off status, two different shades were selected for the screen which is controlled by toggling a class. A welcome and goodbye message was also added.

The font used was from Google fonts - Orbitron which has a nice digital appearance.


