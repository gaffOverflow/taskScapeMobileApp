// import informations
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// fetch database URL and save it in an object variable
const appSettings = {
  databaseURL: "https://task-scape-default-rtdb.firebaseio.com",
};

// line 1 - initialize app to link firebase database and our project
// run    - console.log(app) ==> test run to confirm firebase database is connected
// line 2 - connect project to database with imported function

const app = initializeApp(appSettings);
const database = getDatabase(app);
const listInDB = ref(database, "list");

// assign variables to html elements
const input = document.querySelector("input");
const button = document.querySelector("#button");
const taskContainer = document.querySelector(".taskContainer");

// line 1 - write a function to get whatever text in input field
// line 2 - console.log(input.value) ==> run to confirm it's working
// line 3 - callback function from firebase DataBase to push whatever text in input field to DataBase
// run    - console.log(inputText);
// line 4 - callback function to clear whatever text in input field
button.addEventListener("click", () => {
  let inputText = input.value;
  if (inputText != "") {
    push(listInDB, inputText);

    clearInputField();
  }
});

// line 1 - extract list in database with the onValue function
// run    - console.log(snapshot.val())===> test run
// line 3 - callback function to clear whatever text in itemList to prevent       duplicate item
// line 4 - ittirate over the listItem entries extracted from database
// run    - console.log(listItem[i])===>test run
// line 5 - assign list item to a variable
// line 6 - extract itemKeys form listItem
// line 7 - extract itemValues form listItem
// line 8 - callback function from to push whatever text in input field to to listItem

onValue(listInDB, function (snapshot) {
  if (snapshot.exists()) {
    let listItem = Object.entries(snapshot.val());
    clearListItem();
    for (let i = 0; i < listItem.length; i++) {
      let currentList = listItem[i];
      let itemKeys = currentList[0];
      let itemValues = currentList[1];
      appendList(itemValues);

      // line 1 - write a function to create new list element
      // line 2 - create <li></li> everytime "add to Cart" is clicked and extract anytext in input field to the list element
      function appendList(Text) {
        const li = document.createElement("li");
        li.classList.add("li");
        li.textContent = `${Text}`;
        taskContainer.appendChild(li);

        li.addEventListener("click", function () {
          // console.log(itemKeys);
          let listIdlocation = ref(database, `list/${itemKeys}`);
          remove(listIdlocation);
        });
      }
    }
  } else {
    taskContainer.textContent = "no list available";
  }
});

// line 1 - write a function to clear listItem -- prevent duplicate item
// line 2 - set input field content to empty string
function clearListItem() {
  taskContainer.innerHTML = "";
}

// line 1 - write a function to clear input field
// line 2 - set input field content to empty string
function clearInputField() {
  input.value = "";
}
