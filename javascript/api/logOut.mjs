export function logOut() {
    localStorage.removeItem("userName")
    localStorage.removeItem("accessToken")
}