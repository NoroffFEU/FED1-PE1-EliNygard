import { API_BASE, API_ID, API_NAME, API_POSTS } from "../api/constantAPI.mjs";
import {
  extractErrorMessages,
  renderErrorMessageHtml,
} from "../messages/errorMessage.mjs";

const form = document.querySelector("form");

// get and display the values from selected post
const parameterString = window.location.search;
const searchParams = new URLSearchParams(parameterString);
const title = searchParams.get("title");
const body = searchParams.get("body");
const imgUrl = searchParams.get("imgUrl");
const imgAlt = searchParams.get("imgAlt");
const category = searchParams.get("category");

const titleInput = document.getElementById("title");
titleInput.value = title;
const bodyInput = document.getElementById("body");
bodyInput.value = body;
const imgUrlInput = document.getElementById("img-url");
imgUrlInput.value = imgUrl;
const imgAltInput = document.getElementById("img-alt");
imgAltInput.value = imgAlt;
const categorySelect = document.getElementById("category");
categorySelect.value = category;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get values from form inputs
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const imgUrl = document.getElementById("img-url").value;
  const imgAlt = document.getElementById("img-alt").value;
  const category = document.getElementById("category").value;

  const token = localStorage.getItem("accessToken");

  // Construct the request options
  const requestOptions = {
    method: "PUT",
    body: JSON.stringify({
      title: title,
      body: body,
      media: {
        url: imgUrl,
        alt: imgAlt,
      },
      tags: [category],
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
      console.error(error); // Log errors in console
      console.error(json.errors);
      alert(error.message); //display error to user
    });
});
