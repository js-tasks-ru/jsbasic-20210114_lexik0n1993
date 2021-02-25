export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

