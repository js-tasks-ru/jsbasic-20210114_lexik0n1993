import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.ribbonScrollDistance = 350;

    this.createRibbonBody();
    this.createRibbonItems();
    this.addRibbonArrowsHanlders();
    this.addRibbonScrollHanlder();
    this.addRibbonClickHandler();
  }

  createRibbonBody() {
    const html = `
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner"></nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `;

    this.elem = createElement(html);
  }

  createRibbonItems() {
    this.ribbonInner = this.elem.querySelector('.ribbon__inner');

    this.categories.forEach(({id, name}, index) => {
      const categoryHtml = `
        <a href="#" class="ribbon__item${index === 0 ? ' ribbon__item_active' : ''}" data-id="${id}">${name}</a>
      `;

      this.ribbonInner.insertAdjacentHTML('beforeend', categoryHtml);
      this.activeElement = this.ribbonInner.querySelector('.ribbon__item_active');
    });
  }

  addRibbonArrowsHanlders() {
    this.arrowPrev = this.elem.querySelector('.ribbon__arrow_left');
    this.arrowNext = this.elem.querySelector('.ribbon__arrow_right');

    this.arrowPrev.addEventListener('click', () => this.scrollRibbon(false));
    this.arrowNext.addEventListener('click', () => this.scrollRibbon(true));
  }

  scrollRibbon(direction) {
    this.ribbonInner.scrollBy((direction ? 1 : -1) * this.ribbonScrollDistance, 0);
  }

  addRibbonScrollHanlder() {
    this.ribbonInner.addEventListener('scroll', () => {
      const scrollLeft = this.ribbonInner.scrollLeft;
      const scrollWidth = this.ribbonInner.scrollWidth;
      const clientWidth = this.ribbonInner.clientWidth;
      const scrollRight = scrollWidth - scrollLeft - clientWidth;

      this.hideRibbonArrowButtons(scrollLeft, scrollRight);
    });
  }

  hideRibbonArrowButtons(scrollLeft, scrollRight) {
    if (scrollLeft === 0) {
      this.arrowPrev.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowPrev.classList.add('ribbon__arrow_visible');
    }

    if (scrollRight < 1) {
      this.arrowNext.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowNext.classList.add('ribbon__arrow_visible');
    }
  }

  addRibbonClickHandler() {
    this.elem.addEventListener('click', evt => {
      if (evt.target.classList.contains('ribbon__item')) {
        evt.preventDefault();

        const targetItem = evt.target;
        this.toggleActiveElement(targetItem);

        const id = this.activeElement.dataset.id;
        this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: id,
          bubbles: true
        }));
      }
    });
  }

  toggleActiveElement(newItem) {
    this.activeElement.classList.remove('ribbon__item_active');
    newItem.classList.add('ribbon__item_active');

    this.activeElement = newItem;
  }
}
