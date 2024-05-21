import { removeUnderscore } from "../ui/formatting.mjs";

export function generateHeaderLoggedInHtml() {
  const header = document.getElementById("header-logged-in");

  const nav = document.createElement("nav");
  nav.classList.add("h-f-container", "header-container", "font-primary");

  const leftContainer = document.createElement("div");
  leftContainer.classList.add("content-left");

  const linkHome = document.createElement("a");
  linkHome.href = "../index.html";
  linkHome.setAttribute("title", "HotView Labs Blog");
  linkHome.textContent = "HotView Labs";

  const rightContainer = document.createElement("div");
  rightContainer.classList.add("content-right");

  const userName = JSON.parse(localStorage.getItem("userName"))
  const user = document.createElement("p");
  user.textContent = removeUnderscore(userName) 
  
  const logOutBtn = document.createElement("button");
  logOutBtn.classList.add("button", "button-small");
  logOutBtn.textContent = "Log out"

  rightContainer.append(user, logOutBtn)
  leftContainer.appendChild(linkHome)
  nav.append(leftContainer, rightContainer)
  header.appendChild(nav)
}
