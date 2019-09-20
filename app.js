// This function prevents the scroll event from logging too many times

function debounce(func, wait = 20, immediate = true) {
  var timeout
  return function() {
    var context = this, args = arguments
    var later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

const panels = document.querySelectorAll('.panel')

console.log(panels)

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

window.addEventListener('scroll', debounce(checkSlide))
