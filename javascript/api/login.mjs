import { loginMessageError } from "../messages/loginMessages.mjs";
import { removeErrorMessage } from "../messages/removeMessages.mjs";
import { hideLoader, showLoader } from "../ui/loader.mjs";
import { API_AUTH, API_BASE, API_LOGIN } from "./constantAPI.mjs";

// deep level
async function loginUser(url, userData) {
  // validate the form inputs:
  if (!userData.email) {
    throw new Error("No email provided");
    // replace with ERROR_NO_EMAIL
  }

  if (!userData.password) {
    throw new Error("No password provided");
  }

  showLoader();

  try {
    // Promise for testing loader, REMOVE
    await new Promise((resolve) => setTimeout(resolve, 1000));
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
      throw new Error("Unauthorized: Invalid credentials");
    } else {
      const accessToken = json.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("loginSuccess", true);
      localStorage.setItem("userName", JSON.stringify(json.data.name));

      window.location.href = "../post/manage.html";

      return json;
    }

    // if (response.ok) {
    //   const accessToken = json.data.accessToken;
    //   localStorage.setItem("accessToken", accessToken);
    //   localStorage.setItem("loginSuccess", true);
    //   localStorage.setItem("userName", JSON.stringify(json.data.name));

    //   window.location.href = "../post/manage.html";

    //   return json;
    // } else {
    //   if (response.status === 401) {
    //     loginMessageError(); // move this closer to user?
    //     throw new Error("Unauthorized: Invalid credentials");
    //   } else {
    //     throw new Error(json.error || "Something went wrong. Please try again");
    //   }
    // }
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
}

// 1. put listener inside a function ✅
// 2. try...catch: try cont + await loginUser. Catch error and alert.
//      This is the error the user reads in the dom. Create an error.
// 3. in loginUser create a if(!userName) throw new Error (use error I create) or error.log

// need a function for loginform event listener: "submit", onLogIn
// function onLogIn: try APIs, userData

// surface level
async function onLogIn(event) {
  event.preventDefault();
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const userData = {
      email: email,
      password: password,
    };

    await loginUser(API_BASE + API_AUTH + API_LOGIN, userData);
  } catch (error) {
    alert(error.message);
    // (generate a container and append to document to replace alert)
    console.log(error.message);
  }
}

document.forms.login.email.addEventListener("input", (event) => {
  event.preventDefault();
  if (email.validity.typeMismatch) {
    email.setCustomValidity(
      `Enter a valid email address. "${email.value}" must include a '@' and/or '.'.`
    );
  } else {
    email.setCustomValidity("");
  }
});

// surface level
function setLogInListener() {
  const loginForm = document.getElementById("js-login-form");
  loginForm.addEventListener("submit", onLogIn);
}

setLogInListener();

// Event listener for form when user wants to try again
document.forms.login.addEventListener("click", removeErrorMessage);

// old code, added into a try..catch:
// const loginForm = document.getElementById("js-login-form");
// const emailInput = document.getElementById("email");
// const passwordInput = document.getElementById("password");

//Functions to handle form submission
// loginForm.addEventListener("submit", async function (event) {
//   event.preventDefault();

//   const email = emailInput.value;
//   const password = passwordInput.value;

//   const userData = {
//     email: email,
//     password: password,
//   };

//   await loginUser(API_BASE + API_AUTH + API_LOGIN, userData);
// });
