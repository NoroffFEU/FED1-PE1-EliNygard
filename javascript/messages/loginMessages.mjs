import { removeUnderscore } from "../ui/formatting.mjs";

export function loginMessageSuccess () {
    const messageContainer = document.createElement("div")
    messageContainer.classList.add("message-container")
    
    const message = document.createElement("p");
    message.classList.add("message-success");
    
    const userName = JSON.parse(localStorage.getItem("userName"))
    message.textContent = removeUnderscore(`Welcome ${userName}!`);
    
    messageContainer.appendChild(message);
    document.body.appendChild(messageContainer);

    setTimeout(() => {
        message.remove();
    }, 2000);
};

// after adding this message I got an error in the console: for the document.addEventListener in the login.mjs file

export function loginMessageError() {
    const messageContainer = document.querySelector(".login-error-container")
    
    const message = document.createElement("p");
    message.classList.add("login-message-error");
    message.textContent = "Wrong email or password. Please Try again."
    
    messageContainer.appendChild(message);
};


export function confirmPasswordError() {
    const messageContainer = document.querySelector(".password-error-container")

    const message = document.createElement("p")
    message.classList.add("login-message-error")
    message.textContent = "Passwords do not match. Please try again."

    messageContainer.appendChild(message);
}