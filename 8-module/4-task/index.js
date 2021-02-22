import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();

    this.modalClickHanlder = this.modalClickHanlder.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  addProduct(product) {
    let cartItem = this.cartItems.find(item => item.product.id === product.id);
    
    if (cartItem) {
      cartItem.count++;
    } else {
      this.cartItems.push({
        product,
        count: 1
      });
      cartItem = this.cartItems.find(item => item.product.id === product.id);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    const cartItem = this.cartItems.find(item => item.product.id === productId);
    cartItem.count += amount;

    if (cartItem.count === 0) {
      this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let totalCount = 0;
    this.cartItems.forEach(cartItem => totalCount += cartItem.count);

    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.forEach(cartItem => totalPrice += cartItem.count * cartItem.product.price);

    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    if (!this.modal) {
      this.modal = new Modal();
      this.modal.setTitle('Your order');
    }

    const modalBody = createElement(`<div></div>`);

    this.cartItems.forEach(({product, count}) => {
      const itemElement = this.renderProduct(product, count);
      modalBody.insertAdjacentElement('beforeend', itemElement);
    });

    const orderForm = this.renderOrderForm();
    modalBody.insertAdjacentElement('beforeend', orderForm);

    this.modal.setBody(modalBody);

    this.modal.elem.addEventListener('click', this.modalClickHanlder);
    const form = this.modal.elem.querySelector(`form.cart-form`)
    form.addEventListener(`submit`, this.onSubmit);

    this.modal.open();
  }

  modalClickHanlder(evt) {
    const target = evt.target;
    const isTargetMinus = target.classList.contains(`cart-counter__button_minus`) ||
      target.parentElement.classList.contains(`cart-counter__button_minus`);
    const isTargetPlus = target.classList.contains(`cart-counter__button_plus`) ||
      target.parentElement.classList.contains(`cart-counter__button_plus`);
    
    if (isTargetMinus || isTargetPlus) {
      const productId = target.closest(`.cart-product`).dataset.productId;
      const amount = isTargetPlus ? 1 : -1;

      this.updateProductCount(productId, amount);
    }
  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains(`is-modal-open`)) {
      if (this.cartItems.length === 0) {
        this.modal.close();
      } else {
        const productId = cartItem.product.id;
        const modalBody = this.modal.elem;
        const productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
        const productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
        const infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

        const price = cartItem.count * cartItem.product.price;

        productCount.innerHTML = cartItem.count;
        productPrice.innerHTML =`€${price.toFixed(2)}`;
        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      }
    }

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const form = this.modal.elem.querySelector(`form.cart-form`)
    const formData = new FormData(form);

    form.querySelector(`button[type="submit"]`).classList.add(`is-loading`);

    fetch(`https://httpbin.org/post`, {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          this.onSuccessSubmit();
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  };

  onSuccessSubmit() {
    this.modal.setTitle(`Success!`);
    this.cartItems = [];

    const modalBody = createElement(`
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
    `);

    this.modal.setBody(modalBody);
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

