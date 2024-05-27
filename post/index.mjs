import {
  API_BASE,
  API_NAME,
  API_POSTS,
} from "../javascript/api/constantAPI.mjs";
import { getPosts } from "../javascript/api/getPosts.mjs";
import { generateHeaderHtml } from "../javascript/generateHtml/header.mjs";
import { generateHeaderLoggedInHtml } from "../javascript/generateHtml/headerLoggedIn.mjs";
import { generatePostPageHtml } from "../javascript/generateHtml/postPageHtml.mjs";
import { hideLoader, showLoader } from "../javascript/ui/loader.mjs";

async function renderBlogPostPage(url) {
  const responseData = await getPosts(url);
  const singlePost = responseData.data;

  const main = document.querySelector("main");
  // main.innerHTML = '';
  const blogPost = generatePostPageHtml(singlePost);
  main.appendChild(blogPost);
}

async function main() {
  const userName = JSON.parse(localStorage.getItem("userName"));
  const parameterString = window.location.search;
  const searchParameters = new URLSearchParams(parameterString);
  const postId = searchParameters.get("postId");
  showLoader();
  try {
    if (userName) {
      generateHeaderLoggedInHtml();
      await renderBlogPostPage(API_BASE + API_POSTS + API_NAME + `/${postId}`);
    } else {
      // If user is not logged in:
      generateHeaderHtml();
      await renderBlogPostPage(
        API_BASE + API_POSTS + "/Leli_Nygard" + `/${postId}`
      );
    }
  } catch {
    console.error(error);
  } finally {
    hideLoader();
  }
}
main();
