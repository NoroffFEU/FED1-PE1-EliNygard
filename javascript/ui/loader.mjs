function showLoader() {
    const loader = document.querySelector(".loader")
    loader.hidden = false;
}

function hideLoader() {
    const loader = document.querySelector(".loader")
    console.log(loader);
    loader.hidden = true;
}

export default { show: showLoader, hide: hideLoader };