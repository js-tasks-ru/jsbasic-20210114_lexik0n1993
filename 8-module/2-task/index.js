import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.render();
  }

  render() {
    const productGridHtml = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);

    this.elem = productGridHtml;    
    this.addProductCards(this.products);
  }

  addProductCards(products) {
    const gridContainer = this.elem.querySelector(`.products-grid__inner`);

    products.forEach(product => {
      const productCard = new ProductCard(product);
      gridContainer.insertAdjacentElement(`beforeend`, productCard.elem);
    });
  }

  clearAllCards() {
    this.elem.innerHTML = `<div class="products-grid__inner"></div>`;
  }

  filterCards({
    noNuts = false,
    vegeterianOnly = false,
    maxSpiciness = 4,
    category = ''
  }) {
    let filteredProducts = this.products;

    if (noNuts) {
      filteredProducts = filteredProducts.filter(product => {
        return product.nuts === undefined || product.nuts === false;
      });
    }

    if (vegeterianOnly) {
      filteredProducts = filteredProducts.filter(product => product.vegeterian === true);
    }

    if (category && category.trim() !== '') {
      filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    filteredProducts = filteredProducts.filter(product => {
      return product.spiciness <= maxSpiciness
    });

    this.clearAllCards();
    this.addProductCards(filteredProducts);
  }

  updateFilter(filters) {
    for (let key in filters) {
      this.filters[key] = filters[key];
    }

    this.filterCards(this.filters);
  }
}
