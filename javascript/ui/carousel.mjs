let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide-container");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

const dot1 = document.getElementById("dot-1")
const dot2 = document.getElementById("dot-2")
const dot3 = document.getElementById("dot-3")

dot1.addEventListener('click', () => {
  currentSlide(1)
})

dot2.addEventListener('click', () => {
  currentSlide(2)
})

dot3.addEventListener('click', () => {
  currentSlide(3)
})


const prev = document.getElementById("prev-button")
const next = document.getElementById("next-button")

prev.addEventListener('click', () => {
  plusSlides(-1)
})

next.addEventListener('click', () => {
  plusSlides(1)
})

