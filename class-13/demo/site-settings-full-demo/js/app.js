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

  // local storage
  settings.darkMode = true;
  saveSettings();
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

  // local storage
  settings.darkMode = false;
  saveSettings();
}

// load from local storage
function loadSettings() {
  let getSettings = localStorage.getItem("settings");
  if (getSettings) {
    console.log(getSettings); //
    settings = JSON.parse(getSettings);
    console.log(settings); //
  }
}

// save to local storage
function saveSettings() {
  let stringify = JSON.stringify(settings);
  localStorage.setItem("settings", stringify);
  console.log(stringify); //
}

// use settings from local storage on page load
function pageLoad() {
  let savedSettings = localStorage.getItem("settings");
  if (!savedSettings) {
    return;
  }
  loadSettings();
  if (settings.darkMode) {
    enterDarkMode();
  } else {
    enterLightMode();
  }
  if (settings.open !== null) {
    details[settings.open].setAttribute("open", "open")
  }
  commentBox.value = settings.comment;
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
    // store the open detail & local storage
    if (settings.open === i) { // guard clause so that details that get closed, stay closed
      settings.open = null;
      saveSettings();
      return
    }
    openDetail = i;
    settings.open = i;
    saveSettings();
    // remove 'open' attribute from other details
    for (let j = 0; j < details.length; j++) {
      if (j !== openDetail) {
        details[j].removeAttribute("open");
      }
    }
  });
}

commentBox.addEventListener("input", function () {
  settings.comment = commentBox.value;
  saveSettings();
});

// loads page with saved settings
pageLoad();
