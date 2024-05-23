import { API_BASE, API_ID, API_NAME, API_POSTS } from "../api/constantAPI.mjs";
import { generateHeaderLoggedInHtml } from "../generateHtml/headerLoggedIn.mjs";
// import {
//   extractErrorMessages,
//   renderErrorMessageHtml,
// } from "../messages/errorMessage.mjs";

const form = document.querySelector("form");

// get and display the values from selected post
const parameterString = window.location.search;
const searchParams = new URLSearchParams(parameterString);
const title = searchParams.get("title");
console.log(title);
const body = searchParams.get("body");
const imgUrl = searchParams.get("imgUrl");
console.log(imgUrl);
const imgAlt = searchParams.get("imgAlt");
const category = searchParams.get("category");

const titleInput = document.getElementById("title");
titleInput.value = title;
console.log(titleInput);
const bodyInput = document.getElementById("body");
bodyInput.value = body;
const imgUrlInput = document.getElementById("img-url");
imgUrlInput.value = imgUrl;
console.log(imgUrlInput);
const imgAltInput = document.getElementById("img-alt");
imgAltInput.value = imgAlt;
const categorySelect = document.getElementById("category");
categorySelect.value = category;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get values from form inputs
  const editedTitle = document.getElementById("title").value;
  const editedBody = document.getElementById("body").value;
  const editedImgUrl = document.getElementById("img-url").value;
  const editedImgAlt = document.getElementById("img-alt").value;
  const editedCategory = document.getElementById("category").value;

  const token = localStorage.getItem("accessToken");

  // Construct the request options
  const requestOptions = {
    method: "PUT",
    body: JSON.stringify({
      title: editedTitle,
      body: editedBody,
      media: {
        url: editedImgUrl,
        alt: editedImgAlt,
      },
      tags: [editedCategory],
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  };

  // Send the request
  fetch(API_BASE + API_POSTS + API_NAME + API_ID, requestOptions)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (!title) {
        throw new Error("Can not update post. Please add a title.");
      }
      if (!imgUrl) {
        throw new Error("Can not update post. Please add an image url.")
      }
      if(!imgAlt) {
        throw new Error("Can not update post. Please add a descriptive image text.")
      }
      // if (json.errors) {
      //   console.log(json.errors);
      //   const errorMessages = extractErrorMessages(json);
      //   renderErrorMessageHtml(errorMessages);
      // } 
      else {
        localStorage.removeItem("postId");
        localStorage.setItem("editSuccess", true);
        window.location.href = "../post/manage.html";
      }
    })
    .catch((error) => {
      alert(error.message); //display error to user
      console.error(error); // Log errors in console
      // console.error(json.errors);
    });
});

async function main() {
  generateHeaderLoggedInHtml()
}

main();
