import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  setInitialTopCoord() {
    const {top: topCoord} = this.elem.getBoundingClientRect();
    this.initialTopCoord = topCoord + window.pageYOffset;
  }

  getLeftIndent() {
    const leftIndent = Math.min(
      document.querySelector('.container').getBoundingClientRect().right + 20,
      document.documentElement.clientWidth - this.elem.offsetWidth - 10
    );

    return leftIndent;
  }

  setCartStyles(styles) {
    Object.assign(this.elem.style, styles);
  }

  setCartFixed() {
    const leftIndent = this.getLeftIndent();
    const styles = {
      position: `fixed`,
      top: `50px`,
      zIndex: 1000,
      right: `10px`,
      left: `${leftIndent}px`
    };

    this.setCartStyles(styles);
  }

  setCartDefault() {
    const styles = {
      position: ``,
      top: ``,
      zIndex: ``,
      left: ``,
      right: ``
    };

    this.setCartStyles(styles);
  }

  updatePosition() {
    if (!this.initialTopCoord) {
      this.setInitialTopCoord();
    }

    const isMobile = document.documentElement.clientWidth <= 767;
    if (isMobile) {
      this.setCartDefault();
      return;
    }

    if (window.pageYOffset > this.initialTopCoord) {
      this.setCartFixed();
    } else {
      this.setCartDefault();
    }
  }
}
