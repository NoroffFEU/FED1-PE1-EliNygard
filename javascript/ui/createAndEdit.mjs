// Create and edit pages

import { API_BASE, API_POSTS } from "../api/constantAPI.mjs";
import { createPost } from "./createPost.mjs";

// createPost(API_BASE + API_POSTS)


document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get values from form inputs
        const title = document.getElementById('title').value;
        const body = document.getElementById('body').value;

        // Construct the request options
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        };

        // Send the request
        fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
            .then(response => response.json())
            .then(json => {
                console.log(json); // Log the response from the server
                // Redirect or do something else after successful post
                // Save to local storage?
                // Add to post/index.html
                // Add to manage.html table
            })
            .catch(error => {
                console.error('Error:', error); // Log any errors that occur
            });
    });
});
