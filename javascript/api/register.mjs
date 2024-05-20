import {
  extractErrorMessages,
  renderErrorMessageHtml,
} from "../messages/errorMessage.mjs";
// import { confirmPasswordError } from "../messages/loginMessages.mjs";
import { removeErrorMessage } from "../messages/removeMessages.mjs";
import { hideLoader, showLoader } from "../ui/loader.mjs";
import { API_AUTH, API_BASE, API_REGISTER } from "./constantAPI.mjs";
import { validateRegistrationData } from "./validateUserData.mjs";

async function registerUser(url, userData, confirmPassword) {
  
  showLoader();
  
  try {
    // Promise for testing, REMOVE
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // throw errors if validation fails:
    validateRegistrationData(userData, confirmPassword)

    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);

    if (!response.ok) {
      const errorMessages = extractErrorMessages(json);
      renderErrorMessageHtml(errorMessages);
      console.log("Error", errorMessages);
      return;
    } else {
      localStorage.setItem("registerSuccess", true);
      console.log("Registration success");
      window.location.href = "../account/login.html";
    }
    return json;

    // else {
    //   // display error message
    //   const errorMessages = extractErrorMessages(json);
    //   renderErrorMessageHtml(errorMessages);
    //   console.log("Error", json.error);
    // }
  } catch (error) {
    console.log(error);
    alert(error)
    //create: renderErrorMessageHtml(error.message) 
  } finally {
    hideLoader();
  }
}

// check if user exits:
// document.forms.register.addEventListener("input", async (event) => {
//     const username = event.target;
//     const available = await checkUsernameAvailability(username.value)

//     if(!available) {
//         alert(`The username ${username.value} is taken. Please try another name.`)
//     } else {
//         // do nothing or // clear the custom error message
//     }
// })

// check correct input type in forms:
document.forms.register.email.addEventListener("input", (event) => {
  event.preventDefault();
  if (email.validity.typeMismatch) {
    email.setCustomValidity(
      `Enter a valid email address. "${email.value}" must include a '@' and/or '.'.`
    );
  } else {
    email.setCustomValidity("");
  }
});

// submit form with inputs:
const registerForm = document.getElementById("js-registration-form");

registerForm.addEventListener("submit", async function (event) {
  event.preventDefault(); //prevents the default form submission behavior

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  
    try {
      const userData = { name, email, password };

      console.log(userData);

      await registerUser(API_BASE + API_AUTH + API_REGISTER, userData, confirmPassword);
    } catch (error) {
      // alert(error);
      console.log(error);
    }
  
});

// event listener for input fields. When user want to try again
registerForm.addEventListener("click", () => {
  removeErrorMessage();
});
