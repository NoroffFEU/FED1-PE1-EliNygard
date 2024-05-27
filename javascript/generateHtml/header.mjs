export async function generateHeaderHtml() {
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

  const linkLogin = document.createElement("a");
  linkLogin.title = "Log into your account"
  linkLogin.textContent = "Log in";
  linkLogin.addEventListener("click", () => {
    let targetPath = "./account/login.html";
    
    if (window.location.pathname.includes("/post")) {
      targetPath = "../account/login.html";
    } else if (window.location.pathname.includes("/account")) {
      targetPath = "./login.html";
    }
    
    window.location.href = targetPath;
  });
  
  const linkRegister = document.createElement("a");
  linkRegister.title = "Register an account"
  linkRegister.textContent = "Register";
  linkRegister.addEventListener("click", () => {
    let targetPath = "./account/register.html"

    if(window.location.pathname.includes("/post")) {
      targetPath = "../account/register.html"
    } else if (window.location.pathname.includes("/account")) {
      targetPath = ".register.html"
    }
    window.location.href = targetPath;
  //   const currentPath = window.location.pathname;
  //   if (currentPath.includes("/post") || !currentPath.includes("/account")) {
  //     window.location.href = "../account/register.html";
  //   } 
  //   if (!currentPath.includes("/post")) {
  //     window.location.href = "./account/register.html";
  //   }
  });

  rightContainer.append(linkLogin, linkRegister);
  leftContainer.appendChild(linkHome);
  nav.append(leftContainer, rightContainer);
  header.appendChild(nav);
}
