export function showLoader() {
    let loader = document.querySelector(".loader")
    if (!loader) {
        loader = document.createElement("div");
        loader.classList.add("loader");
        document.body.appendChild(loader)
    }
    loader.hidden = false;
}

export function hideLoader() {
    const loader = document.querySelector(".loader");
    if (loader) {
        loader.hidden = true;
    }
}

