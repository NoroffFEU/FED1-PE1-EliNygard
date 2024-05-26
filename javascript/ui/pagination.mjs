import { renderPosts } from "../../index.mjs";
import { scrollToThumbSection } from "../utils/scroll.mjs";

export function paginate(items, itemsPerPage) {
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

export function renderPaginationControls(paginatedPosts, allPosts) {
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
    button.classList.add("pagination-button", "button", "button-small");
    button.setAttribute("title", "Page number");
    button.setAttribute("aria-label", "Page number");
    button.textContent = index + 1;
    button.addEventListener("click", async () => {
      imageGallery.innerHTML = "";
      renderPosts(page);
      // scroll to section
      scrollToThumbSection();
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
