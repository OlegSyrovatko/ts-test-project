import _ from "lodash";

console.log(_.shuffle([1, 2, 3]));

declare var Global: any;
console.log(Global);

import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { Product } from "./models/product";

const products = [
  { title: "carpet", price: 10.99 },
  { title: "book2", price: 11.99 },
];

const loadedProsucts = plainToClass(Product, products);
// const loadedProsucts = products.map((prod) => {
//   return new Product(prod.title, prod.price);
// });
for (const prod of loadedProsucts) {
  console.log(prod.getProduct());
}
