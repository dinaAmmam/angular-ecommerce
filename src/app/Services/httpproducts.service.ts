import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IProduct } from '../models/iproduct';
import { environment } from '../environments/environment.dev';
@Injectable({
  providedIn: 'root'
})
export class HttpproductsService {

  constructor(private http: HttpClient) { }
  httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  getallproduct():Observable<IProduct[]>{
    return this.http.get<IProduct[]>('http://localhost:3000/products')
  }

  getProductById(id: string | undefined): Observable<IProduct> {
    return this.http.get<IProduct>(`http://localhost:3000/products/${id}`)
  }

  getProductsBycategoryID(categoryid: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`http://localhost:3000/products?categoryID=${categoryid}`);
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`http://localhost:3000/products/${product.id}`, product);
  }

  // getnumberofproduct(): Observable<number> {
  //   return this.http.get<IProduct[]>('http://localhost:3000/products').pipe(
  //     map(products => products.length)
  //   )}

      deleteProduct(id: number): Observable<void> {
        const url = `${environment.baseURL}/products/${id}`;
        return this.http.delete<void>(url, { headers: this.httpHeaders });
      }

  addProduct(product: IProduct) {
    return this.http.post<IProduct>(
      `${environment.baseURL}/products`,
      product,
      {
        headers: this.httpHeaders,
      }
    );
  }

  searchProducts(searchText: string): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(`${environment.baseURL}/products`)
      .pipe(
        map((products) => {
          if (!searchText) {
            return products;
          } else {
            return products.filter((product) => product.name && product.name.includes(searchText));
          }
        })
      );
  }
}

