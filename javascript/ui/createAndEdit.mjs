// Create and edit pages

import { API_BASE, API_NAME, API_POSTS } from "../api/constantAPI.mjs";
// import { createPost } from "./createPost.mjs";

// createPost(API_BASE + API_POSTS)



// document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get values from form inputs
        const title = document.getElementById('title').value;
        const body = document.getElementById('body').value;

        const token = localStorage.getItem('accessToken');

        // Construct the request options
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${token}`,
            },
        };
        
        // Send the request
        fetch(API_BASE + API_POSTS + API_NAME, requestOptions)
            .then(response => response.json())
            .then(json => {
                console.log(json); // Log the response from the server
                
                window.location.href = '../post/manage.html';

                const title = document.getElementById("post-title");
                title.innerHTML = json.data.title;
                const body = document.getElementById("post-body");
                body.innerHTML = json.data.body;
                // Save to local storage?
                // Add to post/index.html
                // Add to manage.html table
                // displayPost(json);
            })
            .catch(error => {
                console.error('Error:', error); // Log any errors that occur
            });
    });
// });

// function displayPost(post) {
//     const responseData = await doFetch(API_BASE + API_POSTS + API_NAME)
// }

// function generatePostHtml(post) {
//     const postTitle = document.createElement("h2");
//     postTitle.textContent = post.title;
// }
