import { generateConfirmHtml } from "../messages/deleteMessages.mjs";
import { formatDate, removeUnderscore } from "../ui/formatting.mjs";

export function generateTableHtml(post) {
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
    if (post.updated === post.created) {
      const formattedDate = post.created;
      date.textContent = formatDate(formattedDate);
    } else {
      const formattedDate = post.updated;
      date.textContent = formatDate(formattedDate);
    }
  
    const pubBtnCell = document.createElement("td");
    const pubBtn = document.createElement("button");
    pubBtn.textContent = "Publish";
    pubBtn.classList.add("button", "button-small", "button-transparent");
    pubBtn.setAttribute("id", "js-btn-publish");
  
    const editBtnCell = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("button", "button-small", "button-transparent");
    editBtn.setAttribute("id", "js-btn-edit");
    editBtn.setAttribute("aria-label", "Edit Post");
    editBtn.addEventListener("click", () => {
      const postId = post.id;
      localStorage.setItem("postId", JSON.stringify(postId));
  
      // save data from post
      const title = post.title;
      const body = post.body;
      const imgUrl = post.media.url;
      const imgAlt = post.media.alt;
      const category = post.tags;
  
      const queryParams = new URLSearchParams({
        title: title,
        body: body,
        imgUrl: imgUrl,
        imgAlt: imgAlt,
        category: category,
      });
  
      const queryParamsString = queryParams.toString();
      window.location.href = `./edit.html?${queryParamsString}`;
    });
  
    const deleteBtnCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("button", "button-small");
    deleteBtn.setAttribute("id", "js-btn-delete");
    deleteBtn.setAttribute("aria-label", "Delete Post");
  
    deleteBtn.addEventListener("click", () => {
      generateConfirmHtml(post);
    });
  
    deleteBtnCell.appendChild(deleteBtn);
    editBtnCell.appendChild(editBtn);
    // pubBtnCell.appendChild(pubBtn);
    tableRow.append(title, author, date, editBtnCell, deleteBtnCell);
    tableBody.appendChild(tableRow);
  }