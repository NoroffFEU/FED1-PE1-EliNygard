export function scrollToTop() {
  window.scrollTo(0, 0);
}

export function scrollToThumbSection() {
  const section = document.querySelector(".ui-wrapper")
  if (section) {
    window.scrollTo({
      top: section.offsetTop + -150,
      behavior: "smooth",
    })

  } else{
    window.scrollTo(0, 0)
  }
}
