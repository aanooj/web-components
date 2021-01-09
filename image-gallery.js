class Gallery extends HTMLElement {
  static get observedAttributes() {
    return ["count"];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const container = document.createElement("div");
    container.setAttribute("class", "container");

    // Apply external styles to the shadow dom
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "style.css");

    // Attach the created element to the shadow dom
    shadow.appendChild(linkElem);
  }

  getImages(count, elem) {
    for (let i = 0; i < count; i++) {
      const img = new Image();
      img.src = "https://placeimg.com/200/200/animal?" + i;
      img.setAttribute("class", "image");
      elem.shadowRoot.appendChild(img);
    }
  }

  connectedCallback() {
    console.log("gallery component injected to DOM", this);
    // this.getImages(this.getAttribute("count"), this);
  }

  disconnectedCallback() {
    console.log("gallery element removed from page.");
  }

  adoptedCallback() {
    console.log("gallery element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(
      "gallery element attributes changed.",
      name,
      oldValue,
      newValue
    );
    this.getImages(this.getAttribute("count"), this);
  }
}

customElements.define("image-gallery", Gallery);
