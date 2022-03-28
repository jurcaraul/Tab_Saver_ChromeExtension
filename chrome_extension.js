let myURL = []; // array where the data are stored
const inputEl = document.querySelector("#input-el"); // Storing the input data in a const
const inputBtn = document.querySelector("#input-btn");
const ulEl = document.querySelector("#ul-el"); // Storing the unordered list in a const
const deleteBtn = document.querySelector("#delete-btn");
const URLFromLocalStorage = JSON.parse(localStorage.getItem("myURL"));
const tabBtn = document.querySelector("#tab-btn");

tabBtn.addEventListener("click", function () {
  /* 
  ---Explication of the next line chrome.tabs......
  "chrome."" = object/ "tabs." = the key of chrome obj wich also is an obj/ "query()"= the method of the "tabs" obj
    "active:true" = acces the active tabs/ "currentWindows:true" = acces the current windows

  */
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) { //funtion trigged when the chrome founds the active tab of the current window
    myURL.push(tabs[0].url); // the value from the "tabs[0].url" is pushed to myURL
    localStorage.setItem("myURL", JSON.stringify(myURL)); // storing "myURL" array as a string in the "localStorage"
    render(myURL);// the function that renders the data saved in the array
  });
});

//conditional , if "URLFromLocalStorage" is truthy, assign to myURL the values stored
if (URLFromLocalStorage) {
  myURL = URLFromLocalStorage;
  render(myURL);
}

// The function that renders the data saved in the array
function render(savedTabs) {
  let listItems = ""; // variable with the value of an empty string
  for (let i = 0; i < savedTabs.length; i++) {
    /* listing the saved data in the unordered list (using template strings)*/
    listItems += `
        <li>
            <a target='_blank' href='${savedTabs[i]}' >
                ${savedTabs[i]} 
            </a>
        </li>`;
  }
  ulEl.innerHTML = listItems;
}

// When the button is clicked,
inputBtn.addEventListener("click", function () {
  myURL.push(inputEl.value); // the value from the inputEL is pushed to the myURL array
  inputEl.value = ""; // after clicking the button, the value of inputEl is reasiged to a empty string (clearing the previos value)
  /*after the value of the inputEl is stored in myURL array, we save the values of 
  the array in localStorage as a string using "JSON.strigify()" */
  localStorage.setItem("myURL", JSON.stringify(myURL));
  render(myURL); // the function that renders the data saved in the array
  // console.log(localStorage.getItem("myURL"));
});

//Delete button, when clicked deletes all the data stored in the localStorage
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear(); //clear the localStorage
  myURL = []; // clear the array(if not, after clicking delete, and save again the deleted items will reapear)
  render(myURL); // clear the DOM (HTML <ul>)
});
