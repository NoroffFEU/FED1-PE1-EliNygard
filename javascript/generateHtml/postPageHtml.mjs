import { copyUrlMessage } from "../messages/copyUrlMessage.mjs";
import { formatDate, removeUnderscore } from "../ui/formatting.mjs";
import { scrollToTop } from "../utils/scroll.mjs";

export function generatePostPageHtml(post) {
  // const main = document.querySelector("main")

  const postWrapper = document.createElement("section");
  postWrapper.classList.add("post-wrapper");

  const img = document.createElement("img");
  img.src = post.media.url;
  img.alt = post.media.alt;

  const postContainer = document.createElement("div");
  postContainer.classList.add("post-container");

  const title = document.createElement("h1");
  title.classList.add("font-secondary", "heading-secondary");
  title.textContent = post.title;

  const postDetails = document.createElement("div");
  postDetails.classList.add("post-details", "font-secondary");

  const author = document.createElement("p");
  author.setAttribute("id", "post-author");
  author.textContent = removeUnderscore(post.author.name);

  const date = document.createElement("p");
  date.setAttribute("id", "post-date");
  date.classList.add("font-secondary");
  if (post.updated === post.created) {
    const formattedDate = post.created;
    date.textContent = formatDate(formattedDate);
  } else {
    const formattedDate = post.updated;
    date.textContent = formatDate(formattedDate);
  }

  const category = document.createElement("p");
  category.textContent = post.tags;
  console.log(category);

  const iconCopyContainer = document.createElement("div");
  iconCopyContainer.classList.add("icon-copy-container");

  const iconCopy = document.createElement("span");
  iconCopy.classList.add("share-icon", "fa-solid", "fa-link");
  iconCopy.setAttribute("title", "Copy link");
  iconCopy.addEventListener("click", () => {
    const postUrl = window.location.href; //current page url
    const copyUrl = postUrl;
    navigator.clipboard
      .writeText(copyUrl)
      .then(() => {
        iconCopyContainer.appendChild(copyUrlMessage());
      })
      .catch((error) => {
        console.error("failed to copy url"), error;
      });
  });

  const bodyText = document.createElement("p");
  bodyText.classList.add("post-content", "font-primary", "body-text");
  bodyText.textContent = post.body;

  const scrollBtnContainer = document.createElement("div");
  scrollBtnContainer.classList.add("flex", "flex-center");

  const scrollButton = document.createElement("button");
  scrollButton.classList.add("button", "button-small");
  scrollButton.textContent = "Scroll To Top";
  scrollButton.addEventListener("click", () => {
    scrollToTop();
  });

  // main.appendChild(postWrapper)
  postDetails.append(author, date, category, iconCopyContainer);
  iconCopyContainer.appendChild(iconCopy);
  scrollBtnContainer.appendChild(scrollButton);
  postContainer.append(title, postDetails, bodyText, scrollBtnContainer);
  postWrapper.append(img, postContainer);

  return postWrapper;
}
