
// export function createPost(url) {
//     const form = document.querySelector("form");

//     form.addEventListener('submit', function(event) {
//         //prevent the form from submitting normally
//         event.preventDefault();
        
//         //get values from form inputs
//         const title = document.getElementById("title").value;
//         const body = document.getElementById("body").value;

//         const token = localStorage.getItem('accessToken');

//         //the request options
//         const requestOptions = {
//             method: "POST",
//             body: JSON.stringify({
//                 title: title,
//                 body: body,
//                 userId: 1,
//             }),
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//                 Authorization: `Bearer ${token}`,
//             },
//         }; 
        
//         //Send the request to create new post
//         fetch(url, requestOptions)
//             .then(response => response.json)
//             .then(json => {
//                 console.log(json);
//                 //Redirect to manage.html after successful post
//             })
//     })
// }


