export function extractErrorMessages(json) {
    console.log(json.errors);
    const errors = json.errors;
    console.log(errors);
    if (errors) {
        console.log(errors);
        return errors.map(error => error.message).filter(Boolean);
    }
}

export function renderErrorMessageHtml() {
    const errorContainer = document.createElement("div")
    errorContainer.classList.add = "error-container"

    
}