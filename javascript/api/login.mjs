import { loginMessageError } from "../messages/loginMessages.mjs";
import { removeErrorMessage } from "../messages/removeMessages.mjs";
import { hideLoader, showLoader } from "../ui/loader.mjs";
import { API_AUTH, API_BASE, API_LOGIN } from "./constantAPI.mjs";

async function loginUser(url, userData) {
  showLoader();

  try {
    // Promise for testing, REMOVE
    await new Promise((resolve) => setTimeout(resolve, 1000));
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

    // validation
    if (!userData.email) {
      throw new Error("No email provided");
      // replace with ERROR_NO_EMAIL
    }

    if (!userData.password) {
      throw new Error("No password provided");
    }

    if (response.ok) {
      const accessToken = json.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("loginSuccess", true);
      localStorage.setItem("userName", JSON.stringify(json.data.name));

      window.location.href = "../post/manage.html";

      return json;
    } else {
      if (response.status === 401) {
        loginMessageError();
      } else {
        console.log(
          "Error",
          json.error || "Something went wrong. Please try again."
        );
      }
    }
  } catch (error) {
    console.log("Error:", error);
    alert(error)
  } finally {
    hideLoader();
  }
}

// 1. put listener inside a function
// 2. try...catch: try cont + await loginUser. Catch error and alert.
//      This is the error the user reads in the dom. Create an error.
// 3. in loginUser create a if(!userName) throw new Error (use error I create) or error.log

// need a function for loginform event listener: "submit", onLogIn
// function onLogIn: try APIs, userData

async function onLogIn(event) {
  event.preventDefault();
  try {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const email = emailInput.value;
    const password = passwordInput.value;

    const userData = {
      email: email,
      password: password,
    };

    await loginUser(API_BASE + API_AUTH + API_LOGIN, userData);
  } catch (err) {
    //tell the user what's wrong. This is not showing because error is being caught in loginuser func
    alert(err);
  }
}

function setUserDataListener() {
  const loginForm = document.getElementById("js-login-form");
  loginForm.addEventListener("submit", onLogIn);
}

setUserDataListener();

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

//Event listener for form when user wants to try again
// loginForm.addEventListener("click", removeErrorMessage);


