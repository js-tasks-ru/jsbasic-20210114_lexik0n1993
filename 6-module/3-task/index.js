import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    this.createCarouselBody();
    this.createCarouselSlides();

    this.initCarousel();

    this.prevArrow.addEventListener('click', this.prevArrowHandler);
    this.nextArrow.addEventListener('click', this.nextArrowHandler);
    this.elem.addEventListener('click', this.addProduct);
  }

  createCarouselBody() {
    const html = `
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
      </div>
    `;

    this.elem = createElement(html);
  }

  createCarouselSlides() {
    const html = `
      <div class="carousel__inner"></div>
    `;
    const carouselRoad = createElement(html);

    this.slides.forEach(slide => {
      carouselRoad.insertAdjacentElement('beforeend', this.createSlide(slide));
    });

    this.elem.insertAdjacentElement('beforeend', carouselRoad);
  }

  createSlide(slide) {
    const {
      name,
      price,
      image,
      id
    } = slide;

    const slideHTML = `
      <div class="carousel__slide" data-id="${id}">
        <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${price.toFixed(2)}</span>
          <div class="carousel__title">${name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;

    return createElement(slideHTML);
  }

  addProduct = (evt) => {
    if (evt.target.classList.contains('carousel__button') ||
      evt.target.parentElement.classList.contains('carousel__button')
    ) {
      const productCard = evt.target.closest('.carousel__slide');

      this.elem.dispatchEvent(new CustomEvent('product-add', {
        detail: productCard.dataset.id,
        bubbles: true
      }));
    }
  }

  prevArrowHandler = () => {
    if (this.activeSlide > 1) {
      this.moveCarousel(false);
      this.activeSlide--;
      this.hideArrowBtns();
    }
  }

  nextArrowHandler = () => {
    if (this.activeSlide < this.slidesLength) {
      this.moveCarousel(true);
      this.activeSlide++;
      this.hideArrowBtns();
    }
  }

  initCarousel() {
    this.prevArrow = this.elem.querySelector('.carousel__arrow_left');
    this.nextArrow = this.elem.querySelector('.carousel__arrow_right');
    this.carouselRoad = this.elem.querySelector('.carousel__inner');
    this.slidesLength = this.carouselRoad.querySelectorAll('.carousel__slide').length;
    this.activeSlide = 1;

    this.hideArrowBtns();
  }

  moveCarousel(direction) {
    const slideWidth = this.carouselRoad.querySelector('.carousel__slide').offsetWidth;
    const currentTranslate = this.carouselRoad.style.transform.match(/-?\d+/) || [0];
    const newTranslate = +currentTranslate[0] + slideWidth * (direction ? -1 : 1);

    this.carouselRoad.style.transform = `translateX(${newTranslate}px)`;
  }

  hideArrowBtns = () => {
    if (this.activeSlide === 1) {
      this.prevArrow.style.display = 'none';
    } else {
      this.prevArrow.style.display = 'flex';
    }

    if (this.activeSlide === this.slidesLength) {
      this.nextArrow.style.display = 'none';
    } else {
      this.nextArrow.style.display = 'flex';
    }
  }
}
