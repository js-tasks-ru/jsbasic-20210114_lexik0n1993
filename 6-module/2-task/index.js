import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;

    this.createCard(this.product);
    this.createOnPlusHandler();
  }

  createCard(product) {
    const {
      name,
      price,
      image
    } = product;

    const cardHTML = `
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${image}" class="card__image" alt="product">
          <span class="card__price">€${price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;
    
    this.elem = createElement(cardHTML);
  }

  createOnPlusHandler() {
    const plusButton = this.elem.querySelector('.card__button');

    plusButton.addEventListener('click', () => {
      this.elem.dispatchEvent(new CustomEvent('product-add', {
        detail: this.product.id,
        bubbles: true
      }));
    });
  }
}
