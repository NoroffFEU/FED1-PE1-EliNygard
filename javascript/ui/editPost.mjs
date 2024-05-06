const form = document.querySelector("form");

const 

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // display the values from local storage?

    // Get values from form inputs
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const imgUrl = document.getElementById("img-url").value;
    const imgAlt = document.getElementById("img-alt").value;
    const category = document.getElementById("category").value;

    const token = localStorage.getItem('accessToken');


})