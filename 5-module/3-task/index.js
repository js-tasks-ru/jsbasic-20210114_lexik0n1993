function initCarousel() {
  const prevArrow = document.querySelector('.carousel__arrow_left');
  const nextArrow = document.querySelector('.carousel__arrow_right');
  const carouselRoad = document.querySelector('.carousel__inner');
  const slidesLength = carouselRoad.querySelectorAll('.carousel__slide').length;
  let activeSlide = 1;

  prevArrow.addEventListener('click', () => {
    if (activeSlide > 1) {
      moveCarousel(false, carouselRoad, activeSlide);
      activeSlide--;
      hideArrowBtns(activeSlide, slidesLength, prevArrow, nextArrow);
    }
  });

  nextArrow.addEventListener('click', () => {
    if (activeSlide < slidesLength) {
      moveCarousel(true, carouselRoad, activeSlide);
      activeSlide++;
      hideArrowBtns(activeSlide, slidesLength, prevArrow, nextArrow);
    }
  });

  hideArrowBtns(activeSlide, slidesLength, prevArrow, nextArrow);
}

function moveCarousel(direction, carousel) {
  const slideWidth = carousel.querySelector('.carousel__slide').offsetWidth;
  const currentTranslate = carousel.style.transform.match(/-?\d+/) || [0];  
  const newTranslate = +currentTranslate[0] + slideWidth * (direction ? -1 : 1);

  carousel.style.transform = `translateX(${newTranslate}px)`;
}

function hideArrowBtns(activeSlide, slidesLength, prevBtn, nextBtn) {
  if (activeSlide === 1) {
    prevBtn.style.display = 'none';
  } else {
    prevBtn.style.display = 'flex';
  }

  if (activeSlide === slidesLength) {
    nextBtn.style.display = 'none';
  } else {
    nextBtn.style.display = 'flex';
  }
}
