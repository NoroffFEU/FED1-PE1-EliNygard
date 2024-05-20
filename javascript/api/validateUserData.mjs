// import {
//   checkEmailAvailability,
//   checkUsernameAvailability,
// } from "./checkUserAvailability.mjs";

export async function validateUserData(userData, confirmPassword) {
//   const availableUsername = await checkUsernameAvailability(userData.name);
//   const availableEmail = await checkEmailAvailability(userData.email);
//   console.log(availableEmail);
  if (!userData.name) {
    throw new Error("Please enter a user name.");
  }
  if (userData.name.length < 3) {
    throw new Error(
      "user name must be a minimum of 3 characters. Please try again"
    );
  }
  if (!userData.email) {
    throw new Error("Please enter your email address.");
  }
  if (!userData.password) {
    throw new Error("Please enter a password");
  }
  if (userData.password.length < 8) {
    throw new Error(
      "Password must be a minimum of 8 characters. Please try again."
    );
  }
  if (userData.password !== confirmPassword) {
    throw new Error("passwords do not match. Please try again");
  }
//   if (!availableUsername) {
//     console.log("name not available");
//     throw new Error("username is taken");
//   }
//   if (!availableEmail) {
//     console.log("email not available");
//     throw new Error("Email is already registered on a user. Please try again");
//   }
}
