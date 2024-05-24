import { formatDate } from "../ui/formatting.mjs";

export function generateThumbPostsHtml(post) {
  const listItem = document.createElement("li");

  const linkWrapper = document.createElement("a");
  linkWrapper.addEventListener("click", (event) => {
    event.preventDefault();
    const postId = post.id;
    const newUrl = `./post/index.html?postId=${postId}`;
    console.log(newUrl);
    window.location.assign(newUrl);
  });

  const thumbContainer = document.createElement("div");
  thumbContainer.classList.add("thumb-container");

  const thumbImg = document.createElement("img");
  thumbImg.src = post.media.url;
  thumbImg.alt = post.media.alt;

  const textContainer = document.createElement("div");
  textContainer.classList.add("read-more");

  const text = document.createElement("p");
  text.textContent = "Read More";

  const title = document.createElement("h3");
  title.classList.add("font-secondary");
  title.textContent = post.title;

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

  textContainer.appendChild(text);
  thumbContainer.append(thumbImg, textContainer);
  linkWrapper.append(thumbContainer, title, date);
  listItem.appendChild(linkWrapper);
  // imageGallery.appendChild(listItem)
  // thumbWrapper.appendChild(imageGallery)

  return listItem;
}
