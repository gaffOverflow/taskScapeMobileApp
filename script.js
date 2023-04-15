// import information

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// function run() {
// fetch database URL
const appSettings = {
  databaseURL: "https://task-scape-default-rtdb.firebaseio.com",
};

// setup communication between firebase database and our project
// connect project from our database using imported function to connect to database
const app = initializeApp(appSettings);
// console.log(app) ==> check if project is connected to firebase database

const database = getDatabase(app);
const listInDB = ref(database, "list");
// }
// run()

// assign variables to html elements required for javascript
const input = document.querySelector("input");
const button = document.querySelector("#button");
const taskContainer = document.querySelector(".taskContainer");

// write a function to get whatever text in input field
button.addEventListener("click", () => {
  // console.log(input.value) ==> run to confirm it's working
  let inputText = input.value;

  // callback function from firebase DB to push whatever text in input field to DB
  push(listInDB, inputText);

  // console.log(inputText);

  // callback function from to push whatever text in input field to to listItem
  // appendList(inputText);

  // callback function to clear whatever text in input field
  clearInputField();
});

onValue(listInDB, function (snapshot) {
  // console.log(snapshot.val())
  let listItem = Object.values(snapshot.val());
  // console.log(listItem)

  taskContainer.innerHTML = "";

  for (let i = 0; i < listItem.length; i++) {
    // console.log(listItem[i])
    let currentList = listItem[i];
    appendList(currentList);
  }
});

// write a function to clear input field
function clearInputField() {
  // set input field content to empty string
  input.value = "";
}

// write a function to create new list element
function appendList(Text) {
  // create <li></li> everytime "add to Cart" is clicked and extract anytext in input field to the list element
  taskContainer.innerHTML += `<li>${Text}</li>`;
}
