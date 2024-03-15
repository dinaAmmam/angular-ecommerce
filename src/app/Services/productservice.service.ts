import { Injectable } from '@angular/core';
import productList from '../../assets/productlist';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: IProduct[];
  constructor() {
    this.products = productList;
  }

  getAllProducts(): IProduct[] {
    return this.products;
  }

  getProductById(id: number | undefined): IProduct | undefined {
    if (!id) return undefined;
    let product = this.products.find((product) => product.id == id);
    if (product) return product;
    return;
  }



  getFilteredProductsName(searchValue: string): IProduct[] {
    if (!searchValue) return this.products;
    return this.products.filter((product) =>
      product.name.includes(searchValue)
    );
  }

  isLastIndex(id: number | undefined) {
    if (!id) return false;

    let findedProduct = this.products[this.products.length - 1];
    return findedProduct.id == id;
  }


  getNextProductId(currentId: number | undefined): number {
    let index = this.products.findIndex((product) => product.id == currentId);
    console.log(index)
    const findedProduct = this.products[++index];
    console.log(findedProduct)
    return findedProduct.id;
  }


getPreviousProductId(currentId: number): number {
  let minimumProductId = 1;
  if (currentId > minimumProductId) {
    return currentId - 1;
  } else {
    return currentId;
  }
}


}
