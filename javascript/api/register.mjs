import {
  extractErrorMessages,
  renderErrorMessageHtml,
} from "../messages/errorMessage.mjs";
import { confirmPasswordError } from "../messages/loginMessages.mjs";
import { removeErrorMessage } from "../messages/removeMessages.mjs";
import { hideLoader, showLoader } from "../ui/loader.mjs";
import { checkUsernameAvailability } from "./checkUsernameAvailability.mjs";
import { API_AUTH, API_BASE, API_REGISTER } from "./constantAPI.mjs";

async function registerUser(url, userData) {
  // loader show
  showLoader();

  try {
    // Promise for testing, REMOVE
    await new Promise((resolve) => setTimeout(resolve, 2000));
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

    if (response.ok) {
      const accessToken = json.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("registerSuccess", true);
      localStorage.setItem("userName", JSON.stringify(json.data.name));

      window.location.href = "../post/manage.html";
      // replace alert with success message
      // alert('User registered successfully');

      return json;
    } else {
      // display error message
      const errorMessages = extractErrorMessages(json);
      renderErrorMessageHtml(errorMessages);
      console.log("Error", json.error);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // loader hide
    hideLoader();
  }
}

// check if user exixts 
document.forms.register.addEventListener("input", async (event) => {
    const username = event.target;
    const available = await checkUsernameAvailability(username.value)

    if(!available) {
        alert(`The username ${username.value} is taken. Please try another name.`)
    } else {
        // do nothing
    }
})

const registerForm = document.getElementById("js-registration-form");

registerForm.addEventListener("submit", async function (event) {
  event.preventDefault(); //prevents the default form submission behavior

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // validate form inputs:
  // add validation on if user exists
  if (!name) {
    alert("Please enter a user name.")
    console.log("enter name");
    return;
  }

  if(name.length < 3) {
    alert("user name must be a minimum of 3 characters. Please try again")
  }

  if (!email) {
    alert("Please enter your email address.")
  }
  // add check if email has @ and so on

  if (!password) {
    alert("Please enter a password")
  }
  if (password.length < 6) {
    alert("Password must be a minimum of 6 characters. Please try again.")
}
  if (password !== confirmPassword) {
    confirmPasswordError();
    console.log("no match");
    return;
  }

  const userData = {
    name: name,
    email: email,
    password: password,
  };

  console.log(userData);

  await registerUser(API_BASE + API_AUTH + API_REGISTER, userData);

  // const loginResponse = await registerUser(API_BASE + API_AUTH + API_REGISTER, userData);
  // if (loginResponse) {
  //     window.location.href = '../post/manage.html';
  // }
});

// event listener for input fields. When user want to try again
registerForm.addEventListener("click", () => {
  removeErrorMessage();
});
