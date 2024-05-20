export class Product {
  title: string;
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
  getProduct() {
    return [this.title, `$${this.price}`];
  }
}
