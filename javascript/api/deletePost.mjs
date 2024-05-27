import { API_BASE, API_NAME, API_POSTS } from "./constantAPI.mjs";

export function deletePost(postId) {
  // get id of selected post ✅
  // get the url ✅

  // const postId = JSON.parse(localStorage.getItem('postId'));
  // const API_ID = `/${postId}`;

  // const userName = JSON.parse(localStorage.getItem("userName"))
  // const name = userName.data.name;
  // const API_NAME = `/${name}`;

  const token = localStorage.getItem("accessToken");
  console.log(postId);

  fetch(API_BASE + API_POSTS + API_NAME + `/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        console.log(response);
        localStorage.setItem("deleteSuccess", true);
        const postElement = document.querySelector(
          `[data-post-id="$CSS.escape(postId)}"]`
        );
        if (postElement) {
          postElement.remove();
        }
        window.location.reload();
      } else {
        if(!token) {
          throw new Error("You are not permitted to delete a post.")
        }
        //add error if post has already been deleted
      }
    })
    .catch((error) => {
      console.error("Error", error);
    });
}
