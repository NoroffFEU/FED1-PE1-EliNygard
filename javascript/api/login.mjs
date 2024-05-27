// import {
//   extractErrorMessages,
//   renderErrorMessageHtml,
// } from "../messages/errorMessage.mjs";
// import { loginMessageError } from "../messages/loginMessages.mjs";
import { registerMessageSuccess } from "../messages/registerMessages.mjs";
import { removeErrorMessage } from "../messages/removeMessages.mjs";
import { hideLoader, showLoader } from "../ui/loader.mjs";
import { API_AUTH, API_BASE, API_LOGIN } from "./constantAPI.mjs";
import { validateLoginData } from "./validateUserData.mjs";

// Activating register success message
document.addEventListener("DOMContentLoaded", function () {
  const displayMessage = (key, callback) => {
    if (localStorage.getItem(key)) {
      callback();
      localStorage.removeItem(key);
    }
  };
  displayMessage("registerSuccess", registerMessageSuccess);
});


// The loginUser function should throw errors that comes from what we attempt to do in onLogIn. If !email if!password if incorrect password

// deep level
async function loginUser(url, userData) {
  // showLoader();

  // try {
    // Promise for testing loader, REMOVE
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    //throw errors and validation:
    validateLoginData(userData);

    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(url, postData);
    const json = await response.json();

    // stops at catch in this block
    // would like to specify if: check if email and password match
    // if (!userData.email) {
    //   throw new Error("No email provided")
    // }
    // if (!response.ok) {
    //   const errorMessages = extractErrorMessages(json);
    //   renderErrorMessageHtml(errorMessages);
    //   return;
    // } 
    // else {
      const accessToken = json.data.accessToken;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("loginSuccess", true);
        localStorage.setItem("userName", JSON.stringify(json.data.name));

        window.location.href = "../post/manage.html";
      } else {
        console.log("Access token not found in response. Try again.");
      }

      return json;
    }

  // } 
  // catch (error) {
  //   //this should maybe be at lower level?
  //   // loginMessageError();
  //   alert(error.message); //display error to user
  //   console.error(error); // Log errors in console
  // } finally {
  //   hideLoader();
  // }
// }

// surface level
async function onLogIn(event) {
  event.preventDefault();
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const email = emailInput.value;
  const password = passwordInput.value;

  showLoader()
  try {
    const userData = { email, password };

    await loginUser(API_BASE + API_AUTH + API_LOGIN, userData);
  } catch (error) {
    console.error(error); // Log errors in console
    alert(error); //display error to user
    // (generate a container and append to document to replace alert)
    // use loginMessageError, but create a general one and put in error message
  } finally {
    hideLoader()
  }
}

// surface level
function setLogInListener() {
  const loginForm = document.getElementById("js-login-form");
  loginForm.addEventListener("submit", onLogIn);
}

setLogInListener();

// Event listener for form when user wants to try again
document.forms.login.addEventListener("click", removeErrorMessage);
