export function removeErrorMessage() {
    const errorMessage = document.querySelector(".login-message-error")
        if (errorMessage) {
            errorMessage.remove();
        }
}