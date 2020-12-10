// build dynamic carousel image content
export const buildCarouselImages = (images = [], index) => {
  if (!images) {
    return '';
  }
  return images
    .map((img) => {
      return `
      <div class="carousel-slides slide-index-${index + 1}">
        <img src="${img.href}" />
      </div>`;
    }).join("");
};
// build dynamic carousel dots
export const buildImageCarouselDots = (length) => {
  const dotHtml = '<span class="dot"></span>';
  return dotHtml.repeat(length);
};

// build carousel content based on index
export const buildCarousel = (images, index) => {
  if (!images || !images.length) {
    return '';
  }
  return `
  <div id="slideShow${index}" class="slideshow-container">
    <div id="slideShowClose" class="close">X</div>
    ${buildCarouselImages(images, index)}
    ${images.length > 1 ? `<a class="prev">&#10094;</a>
    <a class="next">&#10095;</a>
    <div class="dot-container">
      ${buildImageCarouselDots(images.length)}
    </div>
  </div>` : ''}
  `;
};

// build card content dynamically
export const buildCardData = (data = []) => {
  if (!Array.isArray(data)) {
    return '';
  }
  return data
    .map((e, i) => {
      return `<div class="card">
        <label>${e.name}</label>
        <div class="image-container-${i}"><img src="${e.hero.href}"/></div>
        ${
          e.priceRange
            ? `<div class="price">$${e.priceRange.selling.low} - $${e.priceRange.selling.high}</div>`
            : ""
        }
        ${e.price ? `<div class="price">$${e.price.selling}</div>` : ""}
        ${
          e.price && e.price.type
            ? `<div class="special-price">special</div>`
            : ""
        }
      </div>`;
    })
    .join("");
};