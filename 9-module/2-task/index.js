import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.addProduct = this.addProduct.bind(this);
    this.findProduct = this.findProduct.bind(this);
    this.updateNoNutsFilter = this.updateNoNutsFilter.bind(this);
    this.updateVegeterianFilter = this.updateVegeterianFilter.bind(this);
    this.updateSpicinessFilter = this.updateSpicinessFilter.bind(this);
    this.updateCategoryFilter = this.updateCategoryFilter.bind(this);
    this.initialFilter = this.initialFilter.bind(this);

    document.body.addEventListener(`product-add`, this.addProduct);
    document.querySelector(`#nuts-checkbox`).addEventListener(`change`, this.updateNoNutsFilter);
    document.querySelector(`#vegeterian-checkbox`).addEventListener(`change`, this.updateVegeterianFilter);
  }

  async render() {
    this.carousel = new Carousel(slides);
    document.querySelector(`[data-carousel-holder]`)
      .insertAdjacentElement(`beforeend`, this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector(`[data-ribbon-holder]`)
      .insertAdjacentElement(`beforeend`, this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    document.querySelector(`[data-slider-holder]`)
      .insertAdjacentElement(`beforeend`, this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    document.querySelector(`[data-cart-icon-holder]`)
      .insertAdjacentElement(`beforeend`, this.cartIcon.elem);
    this.cart = new Cart(this.cartIcon);

    this.products = await fetch(`products.json`, {
      method: 'GET'
    }).then(result => result.json());

    this.productsGrid = new ProductsGrid(await this.products);
    document.querySelector(`[data-products-grid-holder]`).innerHTML = ``;
    document.querySelector(`[data-products-grid-holder]`)
      .insertAdjacentElement(`beforeend`, this.productsGrid.elem);

    this.stepSlider.elem.addEventListener(`slider-change`, this.updateSpicinessFilter);
    this.ribbonMenu.elem.addEventListener('ribbon-select', this.updateCategoryFilter);
    this.initialFilter();
  }

  findProduct(productId) {
    return this.products.find(product => product.id === productId);
  }

  addProduct(data) {
    const productId = data.detail;
    this.cart.addProduct(this.findProduct(productId));
  }

  updateNoNutsFilter(evt) {
    this.productsGrid.updateFilter({
      noNuts: evt.target.checked
    });
  }

  updateVegeterianFilter(evt) {
    this.productsGrid.updateFilter({
      vegeterianOnly: evt.target.checked
    });
  }

  updateSpicinessFilter({detail: value}) {
    this.productsGrid.updateFilter({
      maxSpiciness: value
    });
  }

  updateCategoryFilter({detail: category}) {
    this.productsGrid.updateFilter({
      category: category
    });
  }

  initialFilter() {
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });
  }
}
