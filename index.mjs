import { API_BASE, API_NAME, API_POSTS } from "./javascript/api/constantAPI.mjs";
import { getPosts } from "./javascript/api/getPosts.mjs";

async function renderPosts() {
    // const userName = JSON.parse(localStorage.getItem("userName"))
    // const name = userName.data.name;
    // const API_NAME = `/${name}`;

    const responseData = await getPosts(API_BASE + API_POSTS + API_NAME);
    const posts = responseData.data;
    console.log(posts);

    const imageGallery = document.querySelector(".image-gallery")
    posts.forEach(post => {
        const postThumb = generateThumbPostsHtml(post);
        imageGallery.appendChild(postThumb)
    })
}

await renderPosts();

function generateThumbPostsHtml(post) {
    const listItem = document.createElement("li")
    
    const linkWrapper = document.createElement("a")
    // linkWrapper.href = "./post/index.html" 
    // url parameter with post id here?
    linkWrapper.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.setItem("post", JSON.stringify(post));
        console.log(JSON.stringify(post));
        const postId = post.id;
        const newUrl = `./post/index.html?post=${postId}` 
        console.log(newUrl);
        window.location.href = newUrl;
    })

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

    textContainer.appendChild(text)
    thumbContainer.append(thumbImg, textContainer)
    linkWrapper.append(thumbContainer, title)
    listItem.appendChild(linkWrapper)
    // imageGallery.appendChild(listItem)
    // thumbWrapper.appendChild(imageGallery)

    return listItem;
}