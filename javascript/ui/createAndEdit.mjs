// Create and edit pages

import { API_BASE } from "../api/constantAPI.mjs";
// import { createPost } from "./createPost.mjs";

// createPost(API_BASE + API_POSTS)


document.addEventListener('DOMContentLoaded', function() {
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

        //retrieving the user data after register user
        const userName = JSON.parse(localStorage.getItem('userName'));

        //using the username to construct the endpoint
        const name = username;
        const endpoint = `/blog/posts/${name}`;
        console.log(endpoint);

        // Send the request
        fetch(API_BASE + endpoint, requestOptions)
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
