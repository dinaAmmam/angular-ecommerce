import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../models/iproduct';
import productList from '../../assets/productlist';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchValue:string="";

  // private productsSubject: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>(productList);
  // products$: Observable<IProduct[]> = this.productsSubject.asObservable();

  private searchValueSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  searchValue$: Observable<string> = this.searchValueSubject.asObservable();

  setSearchValue(searchValue: string): void {
    this.searchValueSubject.next(searchValue);
    console.log("searched")
  }

  applySearchFilter(products: IProduct[]): IProduct[] {
    const searchValue = this.searchValueSubject.value.toLowerCase();
    if (searchValue === '') {
      return products;
    } else {
      return products.filter((product) =>
        product.name.toLowerCase().includes(searchValue)
      );
    }
  }

  // updateProductsList(products: IProduct[]): void {
  //   this.productsSubject.next(products);
  // }
}
