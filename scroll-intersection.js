// ## Scroll Intersection
//
// A custom element to ease the scroll reveal transition effect using
// Intersection observer with the advantage of abstracting all the javascript.
//
// To use it, add the element and use the given "css variables" to build the animation.

// Prevent loading twice
if (!customElements.get("scroll-intersection")) {
  console.time("scroll-intersection")

  // This constant set the smoothness of the animation, but might hurt
  // performance... 20 seems to work fine enough
  const SMOOTHNESS = 20

  // from https://easings.net/#easeInOutQuad
  const easeInOut = function easeInOut(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        entry.target.style.setProperty(
          "--intersection",
          entry.intersectionRatio,
        )
        entry.target.style.setProperty(
          "--reveal",
          easeInOut(entry.intersectionRatio),
        )
      }
    },
    {
      threshold: [...Array(SMOOTHNESS + 1).keys()].map((x) => x / SMOOTHNESS),

      // Reveal only when scrolling down, not hide when it is passed
      // Add negative margin on the bottom, to prevent revealing too soon
      rootMargin: "100% 0px -30% 0px",
    },
  )

  customElements.define(
    "scroll-intersection",
    class ScrollIntersection extends HTMLElement {
      constructor() {
        super()
      }

      connectedCallback() {
        observer.observe(this)
        console.debug("ScrollIntersection connected!")
      }

      disconnectedCallback() {
        observer.unobserve(this)
        console.debug("ScrollIntersection disconnected!")
      }
    },
  )
  console.timeEnd("scroll-intersection")
}
