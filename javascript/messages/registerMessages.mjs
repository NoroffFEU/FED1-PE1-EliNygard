export function registerMessageSuccess () {
    const messageContainer = document.createElement("div")
    messageContainer.classList.add("message-container")
    
    const message = document.createElement("p");
    message.classList.add("message-success");
    
    const userName = JSON.parse(localStorage.getItem("userName"))
    message.textContent = removeUnderscore(`User registered successfully. Welcome ${userName}!`);
    
    messageContainer.appendChild(message);
    document.body.appendChild(messageContainer);

    setTimeout(() => {
        message.remove();
    }, 2000);
};