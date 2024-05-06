import { API_BASE, API_POSTS } from "./javascript/api/constantAPI.mjs";
import { getPost } from "./javascript/api/getPost.mjs";

async function renderPosts() {
    const userName = JSON.parse(localStorage.getItem("userName"))
    const name = userName.data.name;
    const API_NAME = `/${name}`;
    const responseData = await getPost(API_BASE + API_POSTS + API_NAME);
    const posts = responseData.data;
    console.log(posts);
    const thumbnails = document.getElementById("thumbnails")
    posts.forEach(post => {
        const postThumb = generateThumbPostsHtml(post);
        thumbnails.appendChild(postThumb)
        
    })
}

await renderPosts();

function generateThumbPostsHtml(post) {
    const thumbWrapper = document.createElement("div")
    thumbWrapper.classList.add("thumb-wrapper")

    const imageGallery = document.createElement("ul")
    imageGallery.classList.add("image-gallery")

    const listItem = document.createElement("li")
    
    const linkWrapper = document.createElement("a")
    linkWrapper.href = "./post/index.html" // url parameter with post id here?

    const thumbContainer = document.createElement("div")
    thumbContainer.classList.add("thumb-container")

    const thumbImg = document.createElement("img")
    thumbImg.src = post.media.url;
    thumbImg.alt = post.media.alt;

    const textContainer = document.createElement("div")
    textContainer.classList.add("read-more")

    const text = document.createElement("p")
    text.textContent = "Read More"

    const title = document.createElement("h3")
    title.classList.add("font-secondary")
    title.textContent = post.title;
    console.log(title);


    textContainer.appendChild(text)
    thumbContainer.append(thumbImg, textContainer)
    linkWrapper.append(thumbContainer, title)
    listItem.appendChild(linkWrapper)
    imageGallery.appendChild(listItem)
    thumbWrapper.appendChild(imageGallery)

    return thumbWrapper;
}