import { renderPosts } from "../../index.mjs";

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
    const filteredPosts = filterPostsByCategory(posts, selectedCategory);
    renderPosts(filteredPosts);
  });
}

function filterPostsByCategory(posts, category) {
  return posts.filter((post) => post.tags.includes(category));
}
