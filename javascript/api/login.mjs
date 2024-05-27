// import {
//   extractErrorMessages,
//   renderErrorMessageHtml,
// } from "../messages/errorMessage.mjs";
// import { loginMessageError } from "../messages/loginMessages.mjs";
import { renderCatchErrorMessage } from "../messages/catchDisplayErrorMessage.mjs";
import { extractErrorMessages } from "../messages/errorMessage.mjs";
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
  try {
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

    if (!response.ok) {
      const errorMessages =
        "Wrong email or password. Please Try again" ||
        extractErrorMessages(json);
      throw new Error(errorMessages);
    }

    const accessToken = json.data.accessToken;
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("loginSuccess", true);
      localStorage.setItem("userName", JSON.stringify(json.data.name));

      window.location.href = "../post/manage.html";
    } else {
      // do?
    }

    return json;
  } catch (error) {
    throw error;
  }
}

// surface level
async function onLogIn(event) {
  event.preventDefault();
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const email = emailInput.value;
  const password = passwordInput.value;

  showLoader();
  try {
    const userData = { email, password };

    await loginUser(API_BASE + API_AUTH + API_LOGIN, userData);
  } catch (error) {
    console.error(error.message); // Log errors in console
    renderCatchErrorMessage(error.message); //display error to user
  } finally {
    hideLoader();
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
