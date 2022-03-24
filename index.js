const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const buttonSubmit = document.getElementById("btn");
const form = document.getElementById("login");
const firstNameError = document.getElementsByClassName("firstNameError")[0];
const lastNameError = document.getElementsByClassName("lastNameError")[0];
const emailError = document.getElementsByClassName("emailError")[0];

/* This is a JavaScript object. It is a way to store data in JavaScript. */
let error = {};

/* This is a JavaScript event listener. It is a way to listen for an event. In this case, it is
listening for the form to be submitted. */
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkEmpty();
});

// validate empty fields and set error object
function checkEmpty() {
  //loop and remover all key and value fields

  for (let key in error) {
    delete error[key];
  }
  //set all in firstname, lastname, email spans to display none
  firstNameError.style.display = "none";
  lastNameError.style.display = "none";
  emailError.style.display = "none";

  //remove all the border-red-500 classes
  firstNameInput.classList.remove("border-red-500");
  lastNameInput.classList.remove("border-red-500");
  emailInput.classList.remove("border-red-500");

  const firstNameValue = firstNameInput.value.trim();
  const lastNameValue = lastNameInput.value.trim();
  const emailValue = emailInput.value.trim();
  //check if they are checkEmpty
  if (firstNameValue === "") {
    error.firstName = "First Name is required";
  }
  if (lastNameValue === "") {
    error.lastName = "Last Name is required";
  }
  if (emailValue === "") {
    error.email = "Email is required";
  }

  //validate the inputs
  if (firstNameValue !== "") {
    if (!firstNameValue.match(/^[a-zA-Z0-9]+$/)) {
      error.firstName = "First Name must be letters only";
    }
  }
  if (lastNameValue !== "") {
    if (!lastNameValue.match(/^[a-zA-Z0-9]+$/)) {
      error.lastName = "Last Name must be letters only";
    }
  }
  if (emailValue !== "") {
    //email shouold have a domain
    if (!emailValue.match(/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/)) {
      error.email = "Email must be a valid email";
    }
  }

  //if we have error add the error to the error message
  if (Object.keys(error).length > 0) {
    displayError();
  } else {
    //submit the form with a delay of 2 seconds
    //change the button to submitting and add no-cursor class and disabled attribute
    buttonSubmit.value = "Submitting...";
    buttonSubmit.setAttribute("disabled", "disabled");
    new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(submitForm());
      }, 2000);
    });
    //reset the f
  }
}

//display erros respectivey to the classes
function displayError() {
  console.log(error);
  //set all errors to their respectivey in firstname, lastname, email and setting the style first to block
  if (error.firstName) {
    firstNameInput.classList.add("border-red-500");
    firstNameError.style.display = "block";
    firstNameError.innerHTML = error.firstName;
  }
  if (error.lastName) {
    lastNameInput.classList.add("border-red-500");
    lastNameError.style.display = "block";
    lastNameError.innerHTML = error.lastName;
  }
  if (error.email) {
    //loop over the classes and add other classes
    emailInput.classList.add("border-red-500");
    emailError.style.display = "block";
    emailError.innerHTML = error.email;
  }
}
//submitting the form
function submitForm() {
  //show the values
  console.log(firstNameInput.value);
  console.log(lastNameInput.value);
  console.log(emailInput.value);
  //reset the login buttonSubmit
  buttonSubmit.value = "Login Now";

  buttonSubmit.removeAttribute("disabled");

  //reset the form
  form.reset();
}
