export function generateCarouselItem(post) {
  const slideContainer = document.createElement("li");
  slideContainer.classList.add("slide-container", "fade-to-next");

  const newArticleContainer = document.createElement("a");
  newArticleContainer.classList.add("new-article");
  newArticleContainer.addEventListener("click", (event) => {
    event.preventDefault()
    event.preventDefault();
    const postId = post.id;
    const newUrl = `./post/index.html?postId=${postId}`;
    window.location.assign(newUrl);
  })

  // const LinkWrapper = document.createElement("a")
  // LinkWrapper.addEventListener("click", (event) => {
  //   event.preventDefault()
  //   event.preventDefault();
  //   const postId = post.id;
  //   const newUrl = `./post/index.html?postId=${postId}`;
  //   window.location.assign(newUrl);
  // })


  const img = document.createElement("img");
  img.src = post.media.url;
  img.alt = post.media.alt;

  const contentContainer = document.createElement("div");

  const title = document.createElement("h3");
  title.classList.add("font-secondary", "heading-secondary");
  title.textContent = post.title;

  const body = document.createElement("p");
  body.classList.add("font-primary", "body-text", "text-overflow");
  const postBody = post.body;
  body.textContent = textTruncate(postBody, 230);

  const button = document.createElement("button");
  button.classList.add("button-carousel", "font-secondary", "uppercase");
  button.textContent = "Read More";
  // button.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   const postId = post.id;
  //   const newUrl = `./post/index.html?postId=${postId}`;
  //   window.location.assign(newUrl);
  // });

  contentContainer.append(title, body, button);
  newArticleContainer.append(img, contentContainer);
  slideContainer.appendChild(newArticleContainer);

  return slideContainer;
}

function textTruncate(text, maxChars, ellipsis = " ...") {
  if (text.length > maxChars) {
    return text.slice(0, maxChars) + ellipsis;
  } else {
    return text;
  }
}
