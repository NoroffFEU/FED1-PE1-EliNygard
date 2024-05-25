import { logOut } from "../api/logOut.mjs";
import { removeUnderscore } from "../ui/formatting.mjs";

export async function generateHeaderLoggedInHtml() {
  const header = document.querySelector("header");

  const nav = document.createElement("nav");
  nav.classList.add("h-f-container", "header-container", "font-primary");

  const leftContainer = document.createElement("div");
  leftContainer.classList.add("content-left");

  const linkHome = document.createElement("a");
  linkHome.setAttribute("title", "HotView Labs Blog");
  linkHome.textContent = "HotView Labs";
  linkHome.addEventListener("click", () => {
    const currentPath = window.location.pathname;
    if (currentPath.includes("/post") || currentPath.includes("/account")) {
      window.location.href = "../index.html";
    } else {
      window.location.href = "index.html";
    }
  });

  const rightContainer = document.createElement("div");
  rightContainer.classList.add("content-right");

  const linkManage = document.createElement("a");
  linkManage.setAttribute("title", "Manage your posts");
  const userName = JSON.parse(localStorage.getItem("userName"));
  linkManage.textContent = removeUnderscore(userName);
  linkManage.addEventListener("click", () => {
    let targetPath = "./post/manage.html";

    if (window.location.pathname.includes("/post")) {
      targetPath = "./manage.html";
    } else if (window.location.pathname.includes("/account")) {
      targetPath = "../post/manage.html";
    }

    window.location.href = targetPath;
  });

  const logOutBtn = document.createElement("button");
  logOutBtn.classList.add("button", "button-small");
  logOutBtn.textContent = "Log out";
  logOutBtn.addEventListener("click", () => {
    logOut();
    const currentPath = window.location.pathname;
    if (currentPath.includes("/post") || currentPath.includes("/account")) {
      window.location.href = "../index.html";
    } else {
      window.location.href = "index.html";
    }
  });

  rightContainer.append(linkManage, logOutBtn);
  leftContainer.appendChild(linkHome);
  nav.append(leftContainer, rightContainer);
  header.appendChild(nav);
}
