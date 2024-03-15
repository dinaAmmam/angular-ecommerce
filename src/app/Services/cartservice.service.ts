import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../models/iproduct';
import productList from '../../assets/productlist';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private productsCartSubject = new BehaviorSubject<IProduct[]>([]);
  productsCart$ = this.productsCartSubject.asObservable();

  addToCart(product: IProduct) {
    const currentCart = this.productsCartSubject.value;
    const existingProduct = currentCart.find((p) => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
      product.quantity -= 1;
      window.alert(`Do you want to add ${product.name} To Cart?`);
    } else {
      currentCart.push({...product, quantity: 1 });
      product.quantity -= 1;
      window.alert(`Do you want to add ${product.name} To Cart?`);
    }

    this.productsCartSubject.next([...currentCart]);
  }

  removeFromCart(product: IProduct) {
    const currentCart = this.productsCartSubject.value;
    const deletedProductIndex = currentCart.findIndex((p) => p.id === product.id);

    if (deletedProductIndex !== -1) {
      const deletedProduct = currentCart.splice(deletedProductIndex, 1)[0];
      const originalProduct = productList.find((p) => p.id === deletedProduct.id);

      if (originalProduct) {
        originalProduct.quantity += deletedProduct.quantity;
      }
    }

    this.productsCartSubject.next([...currentCart]);
  }

  getTotalCartPrice(): number {
    const currentCart = this.productsCartSubject.value;
    return currentCart.reduce((total, product) => total + product.price * product.quantity, 0);
  }

  getTotalQuantity(): number {
    const currentCart = this.productsCartSubject.value;
    return currentCart.reduce((total, product) => total + product.quantity, 0);
  }

  getFilteredProducts(filterValue: string): IProduct[] {
    if (filterValue === '') {
      return productList;
    } else {
      return productList.filter((product) => product.name.includes(filterValue));
    }
  }
}
