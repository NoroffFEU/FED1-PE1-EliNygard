export function extractErrorMessages(json) {
    const errors = json.errors;
    console.log(errors);
    if (errors) {
        return errors.map(error => error.message).filter(Boolean);
    }
    return []; // returns an empty array if no errors
}

export function renderErrorMessageHtml(messages) {
    // check if there is 'messages' in array before render the error messages
    // if the array is empty, the function returns without doing anything
    if (extractErrorMessages.length >= 1) {
        
        const errorContainer = document.createElement("div")
        errorContainer.classList.add("error-container", "message-container")
        
        console.log("dette logges");
        const errorMessage = document.createElement("p")
        errorMessage.classList.add("message-success")
        errorMessage.textContent = `Something went wrong. Please check the following: ${messages.join(", ")}`;
        console.log(errorMessage.textContent);
        
        const confirmButtonContainer = document.createElement("div")
        confirmButtonContainer.classList.add("confirm-button-container")
    
        const confirmButton = document.createElement("button")
        confirmButton.classList.add("confirm-button", "button-small", "button")
        confirmButton.textContent = "OK";
        confirmButton.addEventListener('click', () => {
            if(errorContainer) {
                errorContainer.remove();
            }
        })
        
        confirmButtonContainer.appendChild(confirmButton);
        errorContainer.append(errorMessage, confirmButtonContainer);
        document.body.appendChild(errorContainer);
    } else {
        console.log("return");
        return;
    }
}