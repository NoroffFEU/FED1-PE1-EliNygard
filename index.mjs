import { API_BASE, API_NAME, API_POSTS } from "./javascript/api/constantAPI.mjs";
import { getPosts } from "./javascript/api/getPosts.mjs";
import { generateCarouselItem } from "./javascript/generateHtml/carouselItem.mjs";
import { generateThumbPostsHtml } from "./javascript/generateHtml/thumbPostHtml.mjs";
// import { currentSlide, plusSlides } from "./javascript/ui/carousel.mjs";

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

async function renderNewPostsCarousel() {
    const responseData = await getPosts(API_BASE + API_POSTS + API_NAME);
    const posts = responseData.data;
    const newPosts = posts.filter(post => post.tags.includes("New Post"));
    console.log(newPosts);
    
    const carousel = document.getElementById("carousel")
    console.log(carousel);
    newPosts.forEach(post => {
        const carouselItem = generateCarouselItem(post);
        console.log(carouselItem);
        carousel.appendChild(carouselItem);
    })
}

// await renderNewPostsCarousel()


// carousel buttons
// const dot1 = document.getElementById("dot-1")
// const dot2 = document.getElementById("dot-2")
// const dot3 = document.getElementById("dot-3")

// dot1.addEventListener('click', () => {
//   currentSlide(1)
// })

// dot2.addEventListener('click', () => {
//   currentSlide(2)
// })

// dot3.addEventListener('click', () => {
//   currentSlide(3)
// })


// const prev = document.getElementById("prev-button")
// const next = document.getElementById("next-button")

// prev.addEventListener('click', () => {
//   plusSlides(-1)
// })

// next.addEventListener('click', () => {
//   plusSlides(1)
// })