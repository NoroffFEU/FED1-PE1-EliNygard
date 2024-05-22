export async function generateHeaderHtml() {
  const header = document.querySelector("header");

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

  const linkLogin = document.createElement("a");
  linkLogin.href = "./account/login.html";
  linkLogin.setAttribute("title", "Log in");
  linkLogin.textContent = "Log in";

  const linkRegister = document.createElement("a");
  linkRegister.href = "./account/register.html";
  linkRegister.setAttribute("title", "Register");
  linkRegister.textContent = "Register";

  rightContainer.append(linkLogin, linkRegister);
  leftContainer.appendChild(linkHome);
  nav.append(leftContainer, rightContainer);
  header.appendChild(nav);
}
