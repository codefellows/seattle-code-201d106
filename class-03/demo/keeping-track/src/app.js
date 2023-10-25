/*
Keeping track outside of loop

this app repeatedly asks user for a number
if number is 0 then stop asking
if number is 5 then increment the fiveCount
report how many times 5 was entered at the end.
*/

let response = prompt("Enter a number, 0 to quit");
let num = parseInt(response);
let fiveCount = 0;

while(num !== 0) {
    if(num === 5) {
        fiveCount += 1;
    }
    response = prompt("Enter a number, 0 to quit");
    num = parseInt(response);

}

alert("You chose 5 this many times:" + fiveCount);
