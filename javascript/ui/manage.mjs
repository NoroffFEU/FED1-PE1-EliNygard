import { API_BASE, API_POSTS } from "../api/constantAPI.mjs";
import { getPost } from "../api/getPost.mjs";
import { deleteSuccessMessage } from "../messages/deleteMessages.mjs";
import { loginMessageSuccess } from "../messages/loginMessages.mjs";
import { formatDate, removeUnderscore } from "./formatting.mjs";


// Activating login success message
document.addEventListener("DOMContentLoaded", function () {
    const loginSuccess = localStorage.getItem("loginSuccess");
    // console.log(loginMessageSuccess);
    if (loginSuccess) {
        loginMessageSuccess();
        localStorage.removeItem("loginSuccess");
    }
    const deleteSuccess = localStorage.getItem("deleteSuccess");
    if (deleteSuccess) {
        deleteSuccessMessage();
        localStorage.removeItem("deleteSuccess");
    }
});

// display posts ✅ (generated into each row in table) ✅

// I have all the posts created in the getPost ✅

// 1. generate tableHtml ✅
// (when button Add post on create.html is clicked, empty form)

// move renderTable to script.mjs? One script on all pages where everything is called?

async function renderTable() {

    const userName = JSON.parse(localStorage.getItem("userName"))
    const name = userName.data.name;
    const API_NAME = `/${name}`;
    const responseData = await getPost(API_BASE + API_POSTS + API_NAME);
    const posts = responseData.data;
    console.log(posts);
    posts.forEach(post => {
        generateTableHtml(post)
    });
}
await renderTable();

function generateTableHtml(post) {
    const tableBody = document.getElementById("tbody");

    const tableRow = document.createElement("tr");
    const postId = post.id;
    tableRow.setAttribute("data-post-id", postId);

    const title = document.createElement("td");
    title.innerHTML = post.title;

    const author = document.createElement("td");
    const authorName = post.author.name;
    author.textContent = removeUnderscore(authorName);

    const date = document.createElement("td");
    const formattedDate = post.created;
    date.textContent = formatDate(formattedDate)

    const pubBtnCell = document.createElement("td");
    const pubBtn = document.createElement("button");
    pubBtn.textContent = "Publish"
    pubBtn.classList.add("button", "button-small", "button-transparent");
    pubBtn.setAttribute("id", "js-btn-publish");

    const editBtnCell = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("button", "button-small", "button-transparent");
    editBtn.setAttribute("id", "js-btn-edit");

    const deleteBtnCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("button", "button-small");
    deleteBtn.setAttribute("id", "js-btn-delete");
    deleteBtn.addEventListener('click', () => {
        const postId = post.id;
        localStorage.setItem('postId', JSON.stringify(postId))
        deletePost(postId);
    });

    deleteBtnCell.appendChild(deleteBtn);
    editBtnCell.appendChild(editBtn);
    pubBtnCell.appendChild(pubBtn);
    tableRow.append(title, author, date, pubBtnCell, editBtnCell, deleteBtnCell);
    tableBody.appendChild(tableRow);
}

// delete post

function deletePost() {
    // get id of selected post ✅
    // get the url ✅

    const postId = JSON.parse(localStorage.getItem('postId'));
    const API_ID = `/${postId}`;

    const userName = JSON.parse(localStorage.getItem("userName"))
    const name = userName.data.name;
    const API_NAME = `/${name}`;

    const token = localStorage.getItem('accessToken');
    
    fetch(API_BASE + API_POSTS + API_NAME + API_ID, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        console.log(response);
        if(response.ok) {
            console.log(response);
            localStorage.setItem('deleteSuccess', true);
            const postElement = document.querySelector(`[data-post-id="$CSS.escape(postId)}"]`);
            if (postElement) {
                postElement.remove();
            }
            window.location.reload();
        } else {
            //add message (if user does not have the token to delete a post)
        }
    }).catch(error => {
        console.error('Error', error);
    })
}


