import {
  extractErrorMessages,
  renderErrorMessageHtml,
} from "../messages/errorMessage.mjs";
import { removeErrorMessage } from "../messages/removeMessages.mjs";
import { hideLoader, showLoader } from "../ui/loader.mjs";
import { API_AUTH, API_BASE, API_REGISTER } from "./constantAPI.mjs";
import { validateRegistrationData } from "./validateUserData.mjs";

async function registerUser(url, userData, confirmPassword) {
  showLoader();

  try {
    // Promise for testing, REMOVE
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // throw errors and validation:
    validateRegistrationData(userData, confirmPassword);

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
      const errorMessages = extractErrorMessages(json);
      renderErrorMessageHtml(errorMessages);
      return;
    } else {
      localStorage.setItem("registerSuccess", true);
      console.log("Registration success");
      window.location.href = "../account/login.html";
    }
    return json;
  } catch (error) {
    console.error(error); // Log errors in console
    alert(error.message); //display error to user
    //create: renderErrorMessageHtml(error.message)
  } finally {
    hideLoader();
  }
}

// submit form with inputs:
async function onRegister(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  try {
    const userData = { name, email, password };
    await registerUser(
      API_BASE + API_AUTH + API_REGISTER,
      userData,
      confirmPassword
    );
  } catch (error) {
    console.error(error); // Log errors in console
    alert(error.message); //display error to user
    // (generate a container and append to document to replace alert)
  }
}

function setRegisterListener() {
  const registerForm = document.forms.register;
  registerForm.addEventListener("submit", onRegister);
}

setRegisterListener();

// event listener for input fields. When user want to try again
document.forms.register.addEventListener("click", () => {
  removeErrorMessage();
});
