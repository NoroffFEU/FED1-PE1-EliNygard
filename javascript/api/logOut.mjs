export function logOut() {
    localStorage.removeItem("userName")
    localStorage.removeItem("accessToken")

    const currentPath = window.location.pathname
    console.log(currentPath);

    let redirectPath;
    console.log(redirectPath);

    if(currentPath.includes("post/")) {
        redirectPath = "../index.html"
        console.log(redirectPath);
    }
    if(currentPath.includes("account")) {
        redirectPath = "../index.html"
        console.log(redirectPath);
    }
    else{
        redirectPath = "index.html"
    }

    window.location.href = redirectPath;
}