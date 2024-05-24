import {
  API_BASE,
  API_NAME,
  API_POSTS,
} from "./javascript/api/constantAPI.mjs";
import { getPosts } from "./javascript/api/getPosts.mjs";
import { generateCarouselItem } from "./javascript/generateHtml/carouselItem.mjs";
import { generateHeaderHtml } from "./javascript/generateHtml/header.mjs";
import { generateHeaderLoggedInHtml } from "./javascript/generateHtml/headerLoggedIn.mjs";
import { generateThumbPostsHtml } from "./javascript/generateHtml/thumbPostHtml.mjs";
import { hideLoader, showLoader } from "./javascript/ui/loader.mjs";

async function checkAndRenderPosts() {
  const userName = JSON.parse(localStorage.getItem("userName"));

  showLoader();

  try {
    // Promise for testing, REMOVE
    // await new Promise(resolve => setTimeout(resolve, 2000));
    if (userName) {
      // if user is logged in
      await generateHeaderLoggedInHtml();
      await setupPostThumbs(API_BASE + API_POSTS + API_NAME);
      // await renderPosts(API_BASE + API_POSTS + API_NAME);
      await renderNewPostsCarousel(API_BASE + API_POSTS + API_NAME);
    } else {
      // If user is not logged in, render posts from this account anyway
      await generateHeaderHtml();
      await setupPostThumbs(API_BASE + API_POSTS + "/Leli_Nygard");
      // await renderPosts(API_BASE + API_POSTS + "/Leli_Nygard");
      await renderNewPostsCarousel(API_BASE + API_POSTS + "/Leli_Nygard");
    }
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
}

await checkAndRenderPosts();

// sort by date function:
function sortPostsByDate(posts) {
  const buttonDesc = document.querySelector(".sort-by-date-descending");
  const buttonAsc = document.querySelector(".sort-by-date-ascending");
  // button.addEventListener("click", () => {
  const sortDescending = () => {
    const sortedPosts = posts.sort((a, b) => {
      const dateA = new Date(a.updated || a.created);
      const dateB = new Date(b.updated || b.created);
      return dateB - dateA;
    });
    const paginatedPosts = paginate(sortedPosts, 4);
    renderPosts(paginatedPosts[0]);
    renderPaginationControls(paginatedPosts, sortedPosts);
  };

  const sortAscending = () => {
    const sortedPosts = posts.sort((a, b) => {
      const dateA = new Date(a.updated || a.created);
      const dateB = new Date(b.updated || b.created);
      return dateA - dateB;
    });
    const paginatedPosts = paginate(sortedPosts, 4);
    renderPosts(paginatedPosts[0]);
    renderPaginationControls(paginatedPosts, sortedPosts);
  };

  buttonAsc.addEventListener("click", sortAscending);
  buttonDesc.addEventListener("click", sortDescending);
  //   const sortedPosts = posts.sort((a, b) => {
  //     const dateA = new Date(a.updated || a.created);
  //     const dateB = new Date(b.updated || b.created);
  //     return dateA - dateB;
  //   });

  //   const paginatedPosts = paginate(sortedPosts, 10);
  //   renderPosts(paginatedPosts[0]);
  //   renderPaginationControls(paginatedPosts, sortedPosts);
  // });
}

async function renderPosts(posts) {
  // const responseData = await getPosts(url);
  // const posts = responseData.data;

  // slice the 12 latests posts:
  // const slicedPosts = posts.slice(0, 12);

  const imageGallery = document.querySelector(".image-gallery");
  imageGallery.innerHTML = "";
  posts.forEach((post) => {
    const postThumb = generateThumbPostsHtml(post);
    imageGallery.appendChild(postThumb);
  });
}

async function renderNewPostsCarousel(url) {
  const responseData = await getPosts(url);
  const posts = responseData.data;
  console.log(posts);

  // slice the 3 latest posts:
  const latestPosts = posts.slice(0, 3);

  const carousel = document.getElementById("carousel");
  carousel.innerHTML = "";
  latestPosts.forEach((newPost) => {
    const carouselItem = generateCarouselItem(newPost);
    carousel.appendChild(carouselItem);
  });
}

async function setupPostThumbs(url) {
  const responseData = await getPosts(url);
  const posts = responseData.data;
  const postsMeta = responseData.meta;
  console.log(postsMeta);
  sortPostsByDate(posts);

  const paginatedPosts = paginate(posts, 4);
  renderPosts(paginatedPosts[0]);
  renderPaginationControls(paginatedPosts, posts);
}

// PAGINATION MOVE TO SEPARATE FILE
function paginate(items, itemsPerPage) {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const pages = [];

  for (let i = 0; i < totalPages; i++) {
    const start = i * itemsPerPage;
    const end = start + itemsPerPage;
    pages.push(items.slice(start, end));
  }
  return pages;
  // return {
  //   pages,
  //   currentPage,
  //   totalPages,
  //   // check if the next or previous page exists, and if it does, it will return the page number. If the next or previous page doesn’t exist, it will return null:
  //   // nextPage: currentPage + 1 < totalPages ? currentPage + 1 : null,
  //   // previousPage: currentPage - 1 >= 0 ? currentPage - 1 : null,
  //   // Loops back to page 1 or last:
  //   nextPage: (currentPage + 1) % totalPages,
  //   previousPage: (currentPage - 1 + totalPages) % totalPages,
  // };
}

function renderPaginationControls(paginatedPosts, allPosts) {
  const pagination = document.querySelector(".pagination");
  const imageGallery = document.querySelector(".image-gallery");
  pagination.innerHTML = "";

  // if (currentPage > 0) {
  //   // if on first page, show previous and first buttons:
  //   renderFirstButton(paginatedPosts);
  //   renderPreviousButton(paginatedPosts, currentPage);
  // }

  paginatedPosts.forEach((page, index) => {
    const button = document.createElement("button");
    button.classList.add("pagination-button");
    button.setAttribute("title", "Page number");
    button.setAttribute("aria-label", "Page number");
    button.textContent = index + 1;
    button.addEventListener("click", async () => {
      imageGallery.innerHTML = "";
      renderPosts(page);
      // scroll to section
    });
    pagination.append(button);

    // if (currentPage < paginatedPosts.length - 1) {
    //   // if not on first page, show next and last buttons:
    //   renderNextButton(paginatedPosts, currentPage);
    //   renderLastButton(paginatedPosts);
    // }
  });
}

// function renderNextButton(paginatedPosts, currentPage) {
//   const pagination = document.querySelector(".pagination");
//   const button = document.createElement("button");
//   button.textContent = "Next Page";
//   button.addEventListener("click", () => {
//     imageGallery.innerHTML = "";
//     renderPosts(paginatedPosts[currentPage] + 1);
//   });
//   pagination.append(button);
// }

// function renderPreviousButton(paginatedPosts, currentPage) {
//   const pagination = document.querySelector(".pagination");
//   const button = document.createElement("button");
//   button.textContent = "Previous Page";
//   button.addEventListener("click", () => {
//     imageGallery.innerHTML = "";
//     renderPosts(paginatedPosts[currentPage] - 1);
//   });
//   pagination.append(button);
// }

// function renderFirstButton(paginatedPosts) {
//   const pagination = document.querySelector(".pagination");
//   const button = document.createElement("button");
//   button.textContent = "First page";
//   button.addEventListener("click", () => {
//     imageGallery.innerHTML = "";
//     renderPosts(paginatedPosts[0]);
//   });
//   pagination.append(button);
// }

// function renderLastButton(paginatedPosts) {
//   const pagination = document.querySelector(".pagination");
//   const button = document.createElement("button");
//   button.textContent = "Last page";
//   button.addEventListener("click", () => {
//     imageGallery.innerHTML = "";
//     renderPosts(paginatedPosts[paginatedPosts.length - 1]);
//   });
//   pagination.append(button);
// }

// NEW SLIDER CODE FROM YOUTUBE
// can not display carousel items when slider code is moved to another file. Find out!

const prevButton = document.getElementById("prev-button");
prevButton.addEventListener("click", () => {
  prevSlide();
});

const nextButton = document.getElementById("next-button");
nextButton.addEventListener("click", () => {
  nextSlide();
});

// try to add dots to the slider?

const slides = document.querySelectorAll("#carousel li");
let slideIndex = 0;

function initializeSlider() {
  if (slides.length > 0) {
    slides[slideIndex].classList.add("display-slide");
  }
}

document.addEventListener("DOMContentLoaded", initializeSlider());

function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }

  slides.forEach((slide) => {
    slide.classList.remove("display-slide");
  });
  slides[slideIndex].classList.add("display-slide");
}

function prevSlide() {
  slideIndex--;
  showSlide(slideIndex);
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

// async function renderHomePage() {
//   // await renderPosts();
// }

// await renderHomePage();

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
