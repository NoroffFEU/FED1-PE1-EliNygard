// function showLoader() {
//     const loader = document.querySelector(".loader")
//     loader.hidden = false;
// }

// function hideLoader() {
//     const loader = document.querySelector(".loader")
//     console.log(loader);
//     loader.hidden = true;
// }

// export default { show: showLoader, hide: hideLoader };

let loader;

function createLoader() {
    const loaderContainer = document.getElementById("loader-container")
    loader = document.createElement("div");
    loader.classList.add("loader");
    loaderContainer.appendChild(loader);
}

export function showLoader() {
    if (!loader) {
        createLoader();
    }
    loader.hidden = false;
}

export function hideLoader() {
    if (loader) {
        loader.hidden = true;
        loader.remove(); // Remove loader from DOM
        loader = null; // Reset loader reference
    }
}
