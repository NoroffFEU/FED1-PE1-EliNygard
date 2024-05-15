import { API_BASE, API_NAME, API_POSTS } from "./javascript/api/constantAPI.mjs";
import { getPosts } from "./javascript/api/getPosts.mjs";
import { generateCarouselItem } from "./javascript/generateHtml/carouselItem.mjs";
import { generateThumbPostsHtml } from "./javascript/generateHtml/thumbPostHtml.mjs";
import { hideLoader, showLoader } from "./javascript/ui/loader.mjs";

async function checkAndRenderPosts() {
  const userName = JSON.parse(localStorage.getItem("userName"));

  showLoader()

  try {
    // Promise for testing, REMOVE
    await new Promise(resolve => setTimeout(resolve, 2000));
    if(userName) {
      // if user is logged in
      await renderPosts(API_BASE + API_POSTS + API_NAME);
      await renderNewPostsCarousel(API_BASE + API_POSTS + API_NAME);
    } else {
        // If user is not logged in, render posts from this account anyway
        await renderPosts(API_BASE + API_POSTS + "/Leli_Nygard")
        await renderNewPostsCarousel(API_BASE + API_POSTS + "/Leli_Nygard")
    }
  } finally {
    hideLoader();
  }
}

await checkAndRenderPosts()

async function renderPosts(url) {


    const responseData = await getPosts(url);
    const posts = responseData.data;
    console.log(posts);

    const imageGallery = document.querySelector(".image-gallery")
    imageGallery.innerHTML = '';
    posts.forEach(post => {
        const postThumb = generateThumbPostsHtml(post);
        imageGallery.appendChild(postThumb)
    })
}


async function renderNewPostsCarousel(url) {
    const responseData = await getPosts(url);
    const posts = responseData.data;
    const newPosts = posts.filter(post => post.tags.includes("New Post"));
    
    const carousel = document.getElementById("carousel")
    carousel.innerHTML = '';
    newPosts.forEach(newPost => {
        const carouselItem = generateCarouselItem(newPost);
        carousel.appendChild(carouselItem);

    })
}

// await renderNewPostsCarousel()

// PAGINATION MOVE TO SEPARATE FILE

function paginate(items, itemsPerPage) {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const pages = [];

  for (let i = 0; i < totalPages; i++) {
    const start = i * itemsPerPage;
    const end = start + itemsPerPage;
    pages.push(items.slice(start, end))
  }
  return pages;
}

function renderPagination(paginatedPosts) {
  const pagination = document.querySelector(".pagination")
  const imageGallery = document.querySelector(".image-gallery")
  pagination.innerHTML = "";

  paginatedPosts.forEach((page, index) => {
    const button = document.createElement("button")
    button.classList.add("pagination-button")
    button.title = "Previous Page"
    button.setAttribute("aria-label", "Previous Page")
    button.textContent = index + 1;
    button.addEventListener('click', async () => {
      imageGallery.innerHTML = "";
      
      // scroll to section
    });
    pagination.append(button);
  })
}



// NEW SLIDER CODE FROM YOUTUBE
// can not display carousel items when slider code is moved to another file. Find out! 

const prevButton = document.getElementById("prev-button")
prevButton.addEventListener('click', () => {
    prevSlide()
})

const nextButton = document.getElementById("next-button")
nextButton.addEventListener('click', () => {
    nextSlide()
})


// try to add dots to the slider?


const slides = document.querySelectorAll("#carousel li")
let slideIndex = 0;


function initializeSlider() {
  if(slides.length > 0) {
    slides[slideIndex].classList.add("display-slide")
  }
}

document.addEventListener("DOMContentLoaded", initializeSlider())

function showSlide(index) {
  if (index >= slides.length){
    slideIndex = 0;
  }
  else if(index < 0) {
    slideIndex = slides.length -1;
  }

  slides.forEach(slide => {
    slide.classList.remove("display-slide")
  })
  slides[slideIndex].classList.add("display-slide")
}

function prevSlide(){
  slideIndex--;
  showSlide(slideIndex)
}

function nextSlide(){
  slideIndex++;
  showSlide(slideIndex)
}

async function renderHomePage() {
    // await renderPosts();
}

await renderHomePage()



// FROM W3SCHOOLS CODE

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