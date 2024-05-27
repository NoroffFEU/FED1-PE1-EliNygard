export function renderCatchErrorMessage(message) {
    const errorContainer = document.createElement("div");
    errorContainer.classList.add("error-container", "message-container");

    const errorMessage = document.createElement("p");
    errorMessage.classList.add("message-success");
    errorMessage.textContent = message;

    const confirmButtonContainer = document.createElement("div");
    confirmButtonContainer.classList.add("confirm-button-container");

    const confirmButton = document.createElement("button");
    confirmButton.classList.add("confirm-button", "button-small", "button");
    confirmButton.textContent = "OK";
    confirmButton.addEventListener("click", () => {
      if (errorContainer) {
        errorContainer.remove();
      }
    });

    confirmButtonContainer.appendChild(confirmButton);
    errorContainer.append(errorMessage, confirmButtonContainer);
    document.body.appendChild(errorContainer);
}