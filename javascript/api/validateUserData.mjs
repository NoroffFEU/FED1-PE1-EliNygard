// import {
//   checkEmailAvailability,
//   checkUsernameAvailability,
// } from "./checkUserAvailability.mjs";

export function validateRegistrationData(userData, confirmPassword) {
  validateUsername(userData.name);
  validateEmail(userData.email);
  validatePassword(userData.password);

  if (userData.password !== confirmPassword) {
    throw new Error("passwords do not match. Please try again");
  }
}

export function validateLoginData(userData) {
  validateEmail(userData.email);
  validatePassword(userData.password);
}

function validateEmail(email) {
  if (!email) {
    throw new Error("Please enter your email address.");
  }

  const emailInput = document.getElementById("email");
  if (emailInput.validity.typeMismatch) {
    throw new Error("Enter a valid email address");
  }
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    throw new Error("Enter a valid email address");
  }
}

function validatePassword(password) {
  if (!password) {
    throw new Error("Please enter a password.");
  }
  if (password.length < 8) {
    throw new Error("Password must be a minimum of 8 characters");
  }
}

function validateUsername(username) {
  if (!username) {
    throw new Error("Please enter a name");
  }
  if (username.length < 3) {
    throw new Error(
      "user name must be a minimum of 3 characters. Please try again"
    );
  }
}

// export async function validateUserData(userData, confirmPassword) {
//   const availableUsername = await checkUsernameAvailability(userData.name);
//   const availableEmail = await checkEmailAvailability(userData.email);
//   console.log(availableEmail);
// if (userData.password !== confirmPassword) {
//     throw new Error("passwords do not match. Please try again");
// }
//   if (!availableUsername) {
//     console.log("name not available");
//     throw new Error("username is taken");
//   }
//   if (!availableEmail) {
//     console.log("email not available");
//     throw new Error("Email is already registered on a user. Please try again");
//   }
// }
