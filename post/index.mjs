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
  const responseData = await getPosts(url);
  console.log(responseData);
  const singlePost = responseData.data;
  console.log(singlePost);

  const main = document.querySelector("main");
  // main.innerHTML = '';
  const blogPost = generatePostPageHtml(singlePost);
  main.appendChild(blogPost);
}

async function main() {
  const userName = JSON.parse(localStorage.getItem("userName"));
  showLoader();
  try {
    if (userName) {
      await renderBlogPostPage(API_BASE + API_POSTS + API_NAME + API_ID);
    } else {
      // If user is not logged in:
      await renderBlogPostPage(API_BASE + API_POSTS + "/Leli_Nygard" + API_ID);
    }
  } catch {
    console.error(error);
  } finally {
    hideLoader();
  }
}
main();
