import { API_BASE, API_POSTS } from "../api/constantAPI.mjs";

const form = document.querySelector("form");

// get and display the values from selected post
const parameterString = window.location.search;
const searchParams = new URLSearchParams(parameterString);
const title = searchParams.get('title');
const body = searchParams.get('body');
const imgUrl = searchParams.get('imgUrl');
const imgAlt = searchParams.get('imgAlt');
const category = searchParams.get('category');

const titleInput = document.getElementById('title');
titleInput.value = title;
const bodyInput = document.getElementById('body');
bodyInput.value = body;
const imgUrlInput = document.getElementById("img-url");
imgUrlInput.value = imgUrl;
const imgAltInput = document.getElementById("img-alt");
imgAltInput.value = imgAlt;
const categorySelect = document.getElementById("category");
categorySelect.value = category;


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
            localStorage.removeItem("postId")
            window.location.href = '../post/manage.html';

            // redirect to manage.html
            // save to local storage?
            // add to post/index.html=
            // displayPosts(json)?
        })
        .catch(error => {
            console.error('error', error);
        })

})