export function loginMessageSuccess () {
    const messageContainer = document.createElement("div")
    messageContainer.classList.add("message-container")
    const message = document.createElement("p");
    message.classList.add("login-message-success");
    message.textContent = "Login successful!";
    messageContainer.appendChild(message);
    document.body.appendChild(messageContainer);

    setTimeout(() => {
        message.remove();
    }, 2000);
};

// after adding this message I got an error in the console: for the document.addEventListener in the login.mjs file