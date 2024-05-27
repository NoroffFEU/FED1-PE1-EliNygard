export function generateCategoryHtml(categories) {
  const select = document.getElementById("category");
  select.innerHTML = ""

  // I want a "all posts/categories" option first in the select list:
  const allPosts = document.createElement("option")
  allPosts.value = "allPosts"
  allPosts.textContent = "All Posts"
  select.appendChild(allPosts)

  // Options for all the specific categories:
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
  });
}
