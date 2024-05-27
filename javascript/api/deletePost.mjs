import { API_BASE, API_NAME, API_POSTS } from "./constantAPI.mjs";

export function deletePost(postId) {
  const token = localStorage.getItem("accessToken");

  fetch(API_BASE + API_POSTS + API_NAME + `/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        localStorage.setItem("deleteSuccess", true);
        const postElement = document.querySelector(
          `[data-post-id="$CSS.escape(postId)}"]`
        );
        if (postElement) {
          postElement.remove();
        }
        window.location.reload();
      } else {
        if (!token) {
          throw new Error("You are not permitted to delete a post.");
        }
        //add error if post has already been deleted
      }
    })
    .catch((error) => {
      console.error("Error", error);
    });
}
