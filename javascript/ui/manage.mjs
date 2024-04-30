import { API_BASE, API_POSTS } from "../api/constantAPI.mjs";
import { getPost } from "../api/getPost.mjs";

getPost(API_BASE + API_POSTS);





// import { loginMessageSuccess } from "../api/login.mjs";

// document.addEventListener("DOMContentLoaded", function () {
//     const loginSuccess = localStorage.getItem("loginSuccess");
//     if (loginSuccess) {
//         loginMessageSuccess();
//         localStorage.removeItem("loginSuccess");
//     }
// });
