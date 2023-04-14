// import information

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

function run() {
  // fetch database URL
  const appSettings = {
    databaseURL: "https://task-scape-default-rtdb.firebaseio.com",
  };

  // setup communication between firebase database and our project
  // connect project from our database using imported function to connect to database
  const app = initializeApp(appSettings);
  // console.log(app) ==> check if project is connected to firebase database

  const database = getDatabase(app);
  const movieInDB = ref(database, "movies");
}

// assign variables to html elements required for javascript
const input = document.querySelector("input");
const button = document.querySelector("#button");

// write a function to get whatever text in input field
button.addEventListener("click", () => {
  // console.log(input.value) ==> run to confirm it's working
  let inputText = input.value
  // callback function from firebase DB to push whatever text in input field
  push(movieInDB, inputText)
});
