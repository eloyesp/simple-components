// ## Scroll Sync
//
// A custom element to ease syncing two elements scrolling
//
// Prevent loading twice
if (!customElements.get("scroll-sync")) {
  console.time("scroll-sync")

  customElements.define(
    "scroll-sync",
    class ScrollSync extends HTMLElement {
      constructor() {
        super()
      }

      connectedCallback() {
        const follow = this.querySelector(
          this.getAttribute("follow") || ".scroll-follow",
        )
        const watch = this.querySelector(
          this.getAttribute("watch") || ".scroll-watch",
        )

        const handleScroll = (event) => {
          const targetTop = event.target.scrollTop
          const targetLeft = event.target.scrollLeft
          follow.scrollTo(targetLeft, targetTop)
        }

        watch.addEventListener("scroll", handleScroll, {
          passive: true,
        })

        // keep references to remove the event listener
        this.watch = watch
        this.handleScroll = handleScroll
        console.log("Scroll-sync connected!")
      }

      disconnectedCallback() {
        this.watch.removeEventListener("scroll", this.handleScroll, {
          passive: true,
        })
        console.log("Scroll-sync disconnected!")
      }
    },
  )
  console.timeEnd("scroll-sync")
}
