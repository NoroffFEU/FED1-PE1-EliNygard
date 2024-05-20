import { hideLoader, showLoader } from "../ui/loader.mjs";
import { API_AUTH, API_BASE, API_REGISTER } from "./constantAPI.mjs";

export async function checkUsernameAvailability(username) {
  showLoader();
  try {
    const response = fetch(API_BASE + API_AUTH + API_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    console.log(username);
    return response.status === 200;
  } catch (error) {
    console.error("Error checking if username is available.", error);
    return false;
  } finally {
    hideLoader();
  }
}

export async function checkEmailAvailability(email) {
  showLoader();
  try {
    const response = fetch(API_BASE + API_AUTH + API_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    console.log(email);
    return response.status === 200;
  } catch (error) {
    console.error("Error checking if email is available.", error);
    return false;
  } finally {
    hideLoader();
  }
}
