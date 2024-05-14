export function removeErrorMessage() {
    const errorMessage = document.querySelector(".login-message-error")
        if (errorMessage) {
            errorMessage.remove();
        }
}

export function removeRegisterErrorMessage() {
    const errorMessage = document.querySelector(".error-message-container")
        if (errorMessage) {
            errorMessage.remove();
        }
}