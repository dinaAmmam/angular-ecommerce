import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import productList from '../../../assets/productlist';
import { ProducthighlightDirective } from '../../dirictive/producthighlight.directive';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { CartService } from '../../Services/cartservice.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ ProducthighlightDirective,
    CurrencyPipe,
    DatePipe,
    ProductComponent,
    NgClass,
    ProductComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  productsCart: IProduct[] = [];
  totalCartPrice: number = 0;
  products: IProduct[] = [];
  @Input() filterValue: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.products = this.cartService.getFilteredProducts(this.filterValue);
    this.cartService.productsCart$.subscribe((cart) => {
      this.productsCart = cart;
      this.totalCartPrice = this.cartService.getTotalCartPrice();
    });
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: IProduct) {
    this.cartService.removeFromCart(product);
  }

  handleBuy() {
    if (!this.productsCart.length) {
      console.error('Cart is empty');
      return;
    }

  }
  getTotalQuantity(): number {
    return this.cartService.getTotalQuantity();
  }
  getTotalCartPrice(): number {
    return this.cartService.getTotalCartPrice();
  }

  handlePrice(price: number) {
    return `$${price}`;
  }
}
