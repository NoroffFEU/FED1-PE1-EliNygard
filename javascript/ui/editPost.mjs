import { API_BASE, API_POSTS } from "../api/constantAPI.mjs";

const form = document.querySelector("form");

// display the values from selected post
const editTitle = JSON.parse(localStorage.getItem('editTitle'));
const title = document.getElementById('title');
title.value = editTitle;

const editBody = 

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get values from form inputs
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const imgUrl = document.getElementById("img-url").value;
    const imgAlt = document.getElementById("img-alt").value;
    const category = document.getElementById("category").value;

    const token = localStorage.getItem('accessToken');

    // Construct the request options
    const requestOptions = {
        method: 'PUT',
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

    // get the username for endpoint
    const userName = JSON.parse(localStorage.getItem("userName"))
    const name = userName.data.name;
    const API_NAME = `/${name}`;

    const postId = JSON.parse(localStorage.getItem("postId"))
    const API_ID = `/${postId}`

    // Send the request
    fetch(API_BASE + API_POSTS + API_NAME + API_ID, requestOptions)
        .then(response => response.json())
        .then(json => {
            console.log(json);

            // window.location.href = '../post/manage.html';

            // redirect to manage.html
            // save to local storage?
            // add to post/index.html=
            // displayPosts(json)?
        })
        .catch(error => {
            console.error('error', error);
        })

})