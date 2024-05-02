import { API_BASE, API_POSTS } from "../api/constantAPI.mjs";
import { getPost } from "../api/getPost.mjs";
import { loginMessageSuccess } from "../messages/loginMessages.mjs";

getPost(API_BASE + API_POSTS);

const userName = localStorage.getItem('userName')
console.log(userName);

// Login success message
document.addEventListener("DOMContentLoaded", function () {
    const loginSuccess = localStorage.getItem("loginSuccess");
    // console.log(loginMessageSuccess);
    if (loginSuccess) {
        loginMessageSuccess();
        localStorage.removeItem("loginSuccess");
    }
});


