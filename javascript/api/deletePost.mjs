// import { API_BASE, API_POSTS } from "./constantAPI.mjs";

// export function deletePost() {
//     // get id of selected post ✅
//     // get the url ✅

//     const postId = JSON.parse(localStorage.getItem('postId'));
//     const API_ID = `/${postId}`;

//     const userName = JSON.parse(localStorage.getItem("userName"))
//     const name = userName.data.name;
//     const API_NAME = `/${name}`;

//     const token = localStorage.getItem('accessToken');
    
//     fetch(API_BASE + API_POSTS + API_NAME + API_ID, {
//         method: 'DELETE',
//         headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         }
//     }).then((response) => {
//         console.log(response);
//         if(response.ok) {
//             console.log(response);
//             localStorage.setItem('deleteSuccess', true);
//             const postElement = document.querySelector(`[data-post-id="$CSS.escape(postId)}"]`);
//             if (postElement) {
//                 postElement.remove();
//             }
//             window.location.reload();
//         } else {
//             //add message (if user does not have the token to delete a post)
//         }
//     }).catch(error => {
//         console.error('Error', error);
//     })
// }

