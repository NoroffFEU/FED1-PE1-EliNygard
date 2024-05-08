export function generateThumbPostsHtml(post) {
    const listItem = document.createElement("li")
    
    const linkWrapper = document.createElement("a")
    // linkWrapper.href = "./post/index.html" 
    // url parameter with post id here?
    linkWrapper.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.setItem("post", JSON.stringify(post));
        console.log(JSON.stringify(post));
        const postId = post.id;
        const newUrl = `./post/index.html?post=${postId}` 
        console.log(newUrl);
        window.location.href = newUrl;
    })

    const thumbContainer = document.createElement("div")
    thumbContainer.classList.add("thumb-container")

    const thumbImg = document.createElement("img")
    thumbImg.src = post.media.url;
    thumbImg.alt = post.media.alt;

    const textContainer = document.createElement("div")
    textContainer.classList.add("read-more")

    const text = document.createElement("p")
    text.textContent = "Read More"

    const title = document.createElement("h3")
    title.classList.add("font-secondary")
    title.textContent = post.title;

    textContainer.appendChild(text)
    thumbContainer.append(thumbImg, textContainer)
    linkWrapper.append(thumbContainer, title)
    listItem.appendChild(linkWrapper)
    // imageGallery.appendChild(listItem)
    // thumbWrapper.appendChild(imageGallery)

    return listItem;
}