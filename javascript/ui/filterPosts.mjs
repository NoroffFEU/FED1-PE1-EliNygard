import { renderPosts } from "../../index.mjs";
import { paginate, renderPaginationControls } from "./pagination.mjs";

export function extractCategories(posts) {
  const categories = new Set();
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      categories.add(tag);
    });
  });
  return Array.from(categories);
}

export function addEventListenerOnCategory(posts) {
  const select = document.getElementById("category");

  select.addEventListener("change", () => {
    const selectedCategory = select.value;
    let filteredPosts;


    // display All Posts:
    if (selectedCategory === "allPosts") {
      filteredPosts = posts;
    } 
    // display posts by category:
    else {
      filteredPosts = filterPostsByCategory(posts, selectedCategory);
    }

    const paginatedPosts = paginate(filteredPosts, 2)
    renderPosts(paginatedPosts[0]);

    renderPaginationControls(paginatedPosts, filteredPosts)
  });
}

function filterPostsByCategory(posts, category) {
  return posts.filter((post) => post.tags.includes(category));
}
