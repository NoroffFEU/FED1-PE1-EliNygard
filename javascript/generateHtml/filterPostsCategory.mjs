export function generateCategoryHtml(categories) {
    const select = document.getElementById("category");
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      select.appendChild(option);
    });
  }