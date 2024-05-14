import { deletePost } from "../api/deletePost.mjs";

export function deleteSuccessMessage() {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container");
    const message = document.createElement("p");
    message.classList.add("message-success");
    message.textContent = "The post was successfully deleted";
    messageContainer.appendChild(message);
    document.body.appendChild(messageContainer);

    setTimeout(() => {
        message.remove();
    }, 3000);
};




export function generateConfirmHtml(post) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container", "dialog");
    
    const message = document.createElement("p");
    message.classList.add("message-success");
    message.textContent = "Are you sure you want to delete this post?"

    const confirmButtonContainer = document.createElement("div")
    confirmButtonContainer.classList.add("confirm-button-container")

    const confirmButton = document.createElement("button")
    confirmButton.classList.add("confirm-button", "button-small", "button");
    confirmButton.setAttribute("value", "true");
    confirmButton.setAttribute("name", "choice")
    confirmButton.textContent = "Yes";
    confirmButton.addEventListener('click', () => {
        
        const dialog = document.querySelector(".dialog")
        if (dialog) {
            const postId = post.id;
            localStorage.setItem('postId', JSON.stringify(postId))
            deletePost(postId);
            dialog.remove();
        } else {
            console.error("error", error);
        }
    })

    const cancelButton = document.createElement("button")
    cancelButton.classList.add("confirm-button", "button-small", "button")
    cancelButton.setAttribute("value", "false")
    cancelButton.setAttribute("name", "choice")
    cancelButton.textContent = "Cancel"
    cancelButton.addEventListener('click', () => {
        const dialog = document.querySelector(".dialog")
        if (dialog) {
            dialog.remove();
        }
    })


    confirmButtonContainer.append(confirmButton, cancelButton)
    messageContainer.append(message, confirmButtonContainer)
    document.body.appendChild(messageContainer)
}