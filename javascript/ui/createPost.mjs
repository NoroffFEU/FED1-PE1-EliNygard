import { API_BASE, API_NAME, API_POSTS } from "../api/constantAPI.mjs";
import { generateHeaderLoggedInHtml } from "../generateHtml/headerLoggedIn.mjs";
import { renderCatchErrorMessage } from "../messages/catchDisplayErrorMessage.mjs";

const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get values from form inputs
  const title = document.getElementById("title").value.trim();
  const body = document.getElementById("body").value;
  const imgUrl = document.getElementById("img-url").value.trim();
  const imgAlt = document.getElementById("img-alt").value.trim();
  const category = document.getElementById("category").value.trim();

  const token = localStorage.getItem("accessToken");

  // Construct the request options
  const requestOptions = {
    method: "POST",
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
  fetch(API_BASE + API_POSTS + API_NAME, requestOptions)
    .then((response) => response.json())
    .then((json) => {
      // validate form:
      if (!title) {
        throw new Error("Please add a title to the new post.");
      }
      if (body.length > 1999) {
        throw new Error(
          "The post body text is over 2000 characters. Please try again"
        );
      }
      if (!imgUrl) {
        throw new Error("Please add an image url.");
      }
      if (!imgAlt) {
        throw new Error(
          "Can not update post. Please add a descriptive image text."
        );
      }
      if (json.errors) {
        throw new Error("Something went wrong. Please try again.");
      } else {
        localStorage.setItem("createSuccess", true);
        window.location.href = "../post/manage.html";
      }
      return json;
    })
    .catch((error) => {
      renderCatchErrorMessage(error.message); //display error to user
      console.error("Error:", error.message); // Log any errors that occur
    });
});

async function main() {
  generateHeaderLoggedInHtml();
}

main();

// TRYING TO PUT INTO SEVERAL FUNCTIONS, BUT FAILED. NOT WORKING. TRY LATER

// document.addEventListener("DOMContentLoaded", () => {
//     setCreatePostListener();
//   });

//   function setCreatePostListener() {
//     const form = document.forms.createPost;
//     form.addEventListener("submit", onCreatePost);
//   }

//   async function onCreatePost(event) {
//     event.preventDefault();
//     try {
//       const postData = getFormValues();
//       validatePostFormData(postData);
//       const requestOptions = constructRequestOptions(postData);
//       await sendPostRequest(API_BASE + API_POSTS + API_NAME, requestOptions);
//       window.location.href = "manage.html";
//     } catch (error) {
//       console.error(error); // log error in console
//       alert(error.message); //display error to user
//     }
//   }

//   function getFormValues() {
//     return {
//       title: document.getElementById("title").value,
//       body: document.getElementById("body").value,
//       imgUrl: document.getElementById("img-url").value,
//       imgAlt: document.getElementById("img-alt").value,
//       category: document.getElementById("category").value,
//       token: localStorage.getItem("accessToken"),
//     };
//   }

//   function validatePostFormData({ title }) {
//     if (!title) {
//       throw new Error("Can not create new post. Please add a title.");
//     }
//   }

//   function constructRequestOptions({
//     title,
//     body,
//     imgUrl,
//     imgAlt,
//     category,
//     token,
//   }) {
//     return {
//       method: "POST",
//       body: JSON.stringify({
//         title: title,
//         body: body,
//         media: {
//           url: imgUrl,
//           alt: imgAlt,
//         },
//         tags: [category],
//       }),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   }

//   async function sendPostRequest(url, requestOptions) {
//     showLoader();
//     try {
//       const response = await fetch(url, requestOptions);
//       const json = await response.json();
//       if(!json.okay){
//       }
//     } catch (error) {
//       throw error;
//     } finally {
//       hideLoader();
//     }
//   }
