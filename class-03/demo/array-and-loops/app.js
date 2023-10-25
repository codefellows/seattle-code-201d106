let students = [];

students.push("DeAndre"); // index 0
students.push("Rhett"); // index 1
students.push("Diana"); // index 2
students.push("Ugo"); // index 3
students.push("Michelangelo"); // index 4
students.push("Charlie"); // index students.length - 1

// console.log("at first", students);

students[1] = "The Incredible Hulk";

// console.log("after change", students);

// roll call for loop
console.log("roll call");
// console.log(students[0], " is present");
// console.log(students[1], " is present");
for(let i=0; i < students.length; i += 1) {
    let studentAtCurrentIndex = students[i];
    console.log(studentAtCurrentIndex, "is present");
}
console.log('roll call done');

// while loop
let x = 1;
// let condition = x < 10;
while(x < 10) {
    console.log('do stuff as long as condition is met');
    x += 5;
}


let replyString = prompt("Enter 6 please");
let replyNumber = parseInt(replyString);
while(replyNumber !== 6) {
  replyString = prompt("Nope. I said Enter 6 please");
  replyNumber = parseInt(replyString);
}

alert("Thanks for the 6");
