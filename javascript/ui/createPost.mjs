import { API_BASE, API_NAME, API_POSTS } from "../api/constantAPI.mjs";
import { extractErrorMessages, renderErrorMessageHtml } from "../messages/errorMessage.mjs";


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
    
    // Send the request
    fetch(API_BASE + API_POSTS + API_NAME, requestOptions)
        .then(response => response.json())
        .then(json => {
            console.log(json);

            if(json.okay) {
                window.location.href = '../post/manage.html';
            } else {
                const errorMessages = extractErrorMessages(json)
                renderErrorMessageHtml(errorMessages)
                // errorMessages.forEach(message => {
                //     renderErrorMessageHtml(message)
                //     console.log(message);
                // }) 
            }
        })
        .catch(error => {
            console.error('Error:', error); // Log any errors that occur
        });
});



