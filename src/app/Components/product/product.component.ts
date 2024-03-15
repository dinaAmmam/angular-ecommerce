import { Component, Input,Output,EventEmitter, OnChanges } from '@angular/core';
import productList from '../../../assets/productlist';
import { IProduct } from '../../models/iproduct';
import { ProducthighlightDirective } from '../../dirictive/producthighlight.directive';
import { CurrencyPipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../Services/cartservice.service';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ProducthighlightDirective,NgClass,CurrencyPipe
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  products:IProduct[] = productList;


handelbuy(product:IProduct){
  product.quantity--;
}

@Input() product!: IProduct;
@Input() searchValue: string = '';
@Output() handleAddToCart = new EventEmitter<IProduct>();

currentDate: Date = new Date();



  addProductToCart(event: MouseEvent, product: IProduct) {
    event.stopPropagation()
    this.cartService.addToCart(product);
  }

  constructor(private router: Router, private cartService: CartService) {}

  handleRoute(id: number) {
    this.router.navigate(['/product', id]);
  }
}
