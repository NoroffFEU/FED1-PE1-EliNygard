export function logInRedirect() {
    const currentPath = window.location.pathname
    console.log(currentPath);

    let redirectPath
    console.log(redirectPath);

    if(currentPath.includes("/post/"))
        redirectPath = "../account/login.html"
}