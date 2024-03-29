// This function prevents the scroll event from logging too many times

const panels = document.querySelectorAll('.panel')
const burger = document.querySelector('.burger')
const menu = document.querySelector('.middle-nav')

function debounce(func, wait = 20, immediate = true) {
  let timeout
  return function() {
    const context = this, args = arguments
    const later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

function checkSlide() {
  panels.forEach(panel => {
    // half way through the image
    const slideInAt = (window.scrollY + window.innerHeight) - panel.clientHeight / 2
    // bottom of the image
    const imageBottom = panel.offsetTop + panel.clientHeight
    const isHalfShown = slideInAt > panel.offsetTop
    const isNotScrolledPast = window.scrollY < imageBottom

    // console.log({slideInAt}, {imageBottom}, {isHalfShown}, {isNotScrolledPast} )

    if (isHalfShown && isNotScrolledPast) {
      panel.classList.add('active')
    } else {
      panel.classList.remove('active')
    }
  })
}

function showMenu() {
  // console.log(menu)
  menu.classList.toggle('active')
}

function closeMenu(e) {
  // console.log(e.target)
  let isBurger = false
  if (burger.contains(e.target)) {
    isBurger = true
  }

  // console.log(isBurger)

  if (!isBurger && menu.classList.contains('active')) {
    menu.classList.remove('active')
  }
}

window.addEventListener('scroll', debounce(checkSlide))
burger.addEventListener('click', showMenu)
document.addEventListener('click', closeMenu)
