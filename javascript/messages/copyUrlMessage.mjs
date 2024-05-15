export function copyUrlMessage() {
    const message = document.createElement("p")
    message.classList.add("icon-copy-message")
    message.textContent = "Link copied!"
    
    setTimeout(() => {
        message.remove();
    }, 3000);
    
    return message;
}