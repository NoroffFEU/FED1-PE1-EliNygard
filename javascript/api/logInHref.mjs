export function logInRedirect() {
    const currentPath = window.location.pathname

    let redirectPath

    if(currentPath.includes("/post/"))
        redirectPath = "../account/login.html"
}