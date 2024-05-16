import {
  API_BASE,
  API_ID,
  API_NAME,
  API_POSTS,
} from "../javascript/api/constantAPI.mjs";
import { getPosts } from "../javascript/api/getPosts.mjs";
import { generatePostPageHtml } from "../javascript/generateHtml/postPageHtml.mjs";
import { hideLoader, showLoader } from "../javascript/ui/loader.mjs";

async function renderBlogPostPage(url) {
  showLoader();

  try {
    // Promise for testing loader, REMOVE
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const responseData = await getPosts(url);
    console.log(responseData);
    const singlePost = responseData.data;
    console.log(singlePost);

    const main = document.querySelector("main");
    // main.innerHTML = '';
    // singlePost.forEach(post => {
    const blogPost = generatePostPageHtml(singlePost);
    main.appendChild(blogPost);

    // })
  } catch (error) {
    console.error("Error", error);
  } finally {
    hideLoader();
  }
}

await renderBlogPostPage(API_BASE + API_POSTS + API_NAME + API_ID);
