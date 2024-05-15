import { copyUrlMessage } from "../javascript/messages/copyUrlMessage.mjs";
import { formatDate, removeUnderscore } from "../javascript/ui/formatting.mjs";


        
const singlePost = JSON.parse(localStorage.getItem("post"));
console.log(singlePost);

function generatePostPageHtml(post) {
    const main = document.querySelector("main")

    const postWrapper = document.createElement("section")
    postWrapper.classList.add("post-wrapper")

    const img = document.createElement("img")
    img.src = post.media.url;
    img.alt = post.media.alt;

    const postContainer = document.createElement("div")
    postContainer.classList.add("post-container")

    const title = document.createElement("h1")
    title.classList.add("font-secondary", "heading-secondary")
    title.textContent = post.title;

    const postDetails = document.createElement("div")
    postDetails.classList.add("post-details", "font-secondary")

    const author = document.createElement("p")
    author.setAttribute("id", "post-author")
    author.textContent = removeUnderscore(post.author.name);

    const date = document.createElement("p")
    date.setAttribute("id", "post-date")
    date.classList.add("font-secondary")
    if (post.updated === post.created) {
        const formattedDate = post.created;
        date.textContent = formatDate(formattedDate);
    } else {
        const formattedDate = post.updated;
        date.textContent = formatDate(formattedDate);
    }

    const iconCopyContainer = document.createElement("div")
    iconCopyContainer.classList.add("icon-copy-container")

    const iconCopy = document.createElement("span")
    iconCopy.classList.add("share-icon", "fa-solid", "fa-link")
    iconCopy.setAttribute("title", "Copy link")
    iconCopy.addEventListener('click', () => {
        const postUrl = window.location.href; //current page url
        const copyUrl = postUrl;
        navigator.clipboard.writeText(copyUrl).then(() => {
            iconCopyContainer.appendChild(copyUrlMessage())
        }).catch((error) => {
            console.error("failed to copy url"), error;
        });
    });

    const bodyText = document.createElement("p")
    bodyText.classList.add("post-content", "font-primary", "body-text")
    bodyText.textContent = post.body;

    main.appendChild(postWrapper)
    postDetails.append(author, date, iconCopyContainer)
    iconCopyContainer.appendChild(iconCopy)
    postContainer.append(title, postDetails, bodyText)
    postWrapper.append(img, postContainer)

    return postWrapper;
}

generatePostPageHtml(singlePost)


// async function renderSinglePost() {
    //     const userName = JSON.parse(localStorage.getItem("userName"))
    //     const name = userName.data.name;
    //     const API_NAME = `/${name}`;
    //     const postId = JSON.parse(localStorage.getItem("postId"))
    //     console.log(postId);
    //     const API_ID = `/${postId}`;
    
    //     const responseData = await getPost(API_BASE + API_POSTS + API_NAME + API_ID);
    //     const singlePost = responseData.data;
    //     console.log(singlePost);
    //     singlePost.forEach(singlePost => {
        //         generatePostPageHtml(singlePost)
        //     })
        // }
        
        // await renderSinglePost();