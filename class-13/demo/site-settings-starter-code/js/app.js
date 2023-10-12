"use strict";

// settings to use with local storage
let settings = {
  darkMode: false,
  open: null,
  comment: "",
};

let mode = document.getElementsByClassName("mode");
let details = document.getElementsByTagName("details");
let commentBox = document.getElementById("commentBox");
let openDetail = null;

function enterDarkMode() {
  let body = document.body;
  let welcome = document.getElementById("welcome");
  let button = document.getElementById("darkButton");
  body.classList.remove("light");
  welcome.classList.remove("light");
  body.classList.add("dark");
  welcome.classList.add("dark");
  button.setAttribute("checked", "checked");
  settings.darkMode = true;
}

function enterLightMode() {
  let body = document.body;
  let welcome = document.getElementById("welcome");
  let button = document.getElementById("lightButton");
  body.classList.remove("dark");
  welcome.classList.remove("dark");
  body.classList.add("light");
  welcome.classList.add("light");
  button.setAttribute("checked", "checked");
  settings.darkMode = false;
}

// add event listener to dark mode form
for (let i = 0; i < mode.length; i++) {
  mode[i].addEventListener("click", function () {
    // change styling of background and text color
    if (this.value === "dark") {
      enterDarkMode();
    }
    if (this.value === "light") {
      enterLightMode();
    }
  });
}

// add event listener to all details
for (let i = 0; i < details.length; i++) {
  details[i].addEventListener("click", function () {
    for (let j = 0; j < details.length; j++) {
      if (j !== openDetail) {
        details[j].removeAttribute("open");
      }
    }
  });
}