// Create and edit pages

import { API_BASE, API_POSTS } from "../api/constantAPI.mjs";
// import { createPost } from "./createPost.mjs";

// createPost(API_BASE + API_POSTS)



// document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get values from form inputs
        const title = document.getElementById('title').value;
        const body = document.getElementById('body').value;
        const imgUrl = document.getElementById("img-url").value;
        const imgAlt = document.getElementById("img-alt").value;
        const category = document.getElementById("category").value;

        const token = localStorage.getItem('accessToken');

        // Construct the request options
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
                media: {
                    url: imgUrl,
                    alt: imgAlt,  
                },
                tags: [
                    category
                ],
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${token}`,
            },
        };

        const userName = JSON.parse(localStorage.getItem("userName"))
        const name = userName.data.name;
        const API_NAME = `/${name}`;
        
        // Send the request
        fetch(API_BASE + API_POSTS + API_NAME, requestOptions)
            .then(response => response.json())
            .then(json => {
                console.log(json); // Log the response from the server
                
                window.location.href = '../post/manage.html';

               
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


