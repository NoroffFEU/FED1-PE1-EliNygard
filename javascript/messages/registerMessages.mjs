import { removeUnderscore } from "../ui/formatting.mjs";

export function registerMessageSuccess () {
    const messageContainer = document.createElement("div")
    messageContainer.classList.add("message-container")
    
    const message = document.createElement("p");
    message.classList.add("message-success");
    
    const userName = JSON.parse(localStorage.getItem("userName"))
    message.textContent = removeUnderscore(`User registered successfully. Please log in.`);
    
    messageContainer.appendChild(message);
    document.body.appendChild(messageContainer);

    setTimeout(() => {
        message.remove();
    }, 3000);
};