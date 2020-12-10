import { buildCarousel, buildCardData } from './utilities';
const app = () => {
  const slideIndex = [];
  let realData;

  // remove overlay
  const removeOverlay = () => {
    document.getElementById('overlay').style.display = 'none';
  };

  // bind carousel events for '<' and '>'
  const bindCarouselEvents = (index, className) => {
    document
      .querySelector(`#slideShow${index} .prev`)
      .addEventListener('click', () => {
        plusSlides(-1, index, className);
      });
    document
      .querySelector(`#slideShow${index} .next`)
      .addEventListener('click', () => {
        plusSlides(1, index, className);
      });
  };

  // show Carousel on image click
  const showCarousel = (index) => {
    const overlayEle = document.getElementById('overlay');
    const className = `slide-index-${index + 1}`;

    overlayEle.innerHTML = buildCarousel(realData.groups[index].images, index);

    showSlides(1, index, className);
    bindCarouselEvents(index, className);

    const slideShowCloseEle = document.getElementById('slideShowClose');
    slideShowCloseEle.addEventListener('click', () => {
      removeOverlay();
    });
    overlayEle.style.display = 'block';
  };

  // add click event for the dynamically generated cards
  const addCardEvents = () => {
    document.querySelectorAll('.card').forEach((ele, i) => {
      ele.addEventListener('click', () => {
        showCarousel(i);
      });
    });
  };

  // handle carousel '<' and '>' click events
  const plusSlides = (n, no, className) => {
    showSlides((slideIndex[no] += n), no, className);
  };

  // show slides
  const showSlides = (n, no, className) => {
    const x = document.getElementsByClassName(className);
    const dots = document.querySelectorAll(`#slideShow${no} .dot`);
    if (n > x.length) {
      slideIndex[no] = 1;
    }
    if (n < 1) {
      slideIndex[no] = x.length;
    }
    for (let i = 0; i < x.length; i++) {
      x[i].style.display = 'none';
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    x[slideIndex[no] - 1].style.display = 'block';
    dots[slideIndex[no] - 1].className += ' active';
  };

  // Fetch the products.
  const getProducts = async () => {
    const res = await fetch(
      'https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json'
    );
    realData = await res.json();
  };

  const init = async () => {
    await getProducts();
    const htmlContent = buildCardData(realData.groups);
    realData.groups.forEach((el) => slideIndex.push(1));
    document.getElementById('app').innerHTML = htmlContent;
    addCardEvents();
  };
  return {
    init
  }
};
document.addEventListener("DOMContentLoaded", function() {
  app().init();
});