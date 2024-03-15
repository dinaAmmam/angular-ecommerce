import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ProducthighlightDirective } from '../../dirictive/producthighlight.directive';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { IProduct } from '../../models/iproduct';
import productList from '../../../assets/productlist';
import { NavbarComponent } from '../navbar/navbar.component';
import { DataService } from '../../Services/dataservic.service';
import { SearchService } from '../../Services/searchservice.service';
import { HttpproductsService } from '../../Services/httpproducts.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProducthighlightDirective,
    CurrencyPipe,
    DatePipe,
    ProductComponent,
    NgClass,
    ProductComponent,NavbarComponent,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

})
export class HomeComponent implements OnChanges, OnInit, OnDestroy {
  productsCart: IProduct[] = [];
  totalCartPrice: number = 0;
  searchText: string = '';

  products: IProduct[] = productList;
  @Input() filterValue: string = '';
  @Input() product!: IProduct;

  constructor(private dataService: DataService ,private searchservice:SearchService,private httpProductService:HttpproductsService) { }

  selectcategory:number|null=null;


  filterbycategory(categoryID:number){
    this.selectcategory=categoryID;
  }


  ngOnChanges(): void {
    this.httpProductService
      .searchProducts(this.filterValue)
      .subscribe((data) => {
        this.products = data;
      });
  }

  ngOnInit(): void {
    this.httpProductService.getallproduct().subscribe({
      next: (data) => {
        this.products = data;
      }
    })
    this.calculateTotalPrice();
    this.dataService.dataObservable$.subscribe((data) => {
      console.log('Received data:', data);
    });
  }


  handleBuy() {
    if (!this.product) {
      console.error('Product is undefined');
      return;
    }
  }

  calculateTotalPrice() {
    this.totalCartPrice = this.productsCart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }

  addToCart(product: IProduct) {
    const existingProduct = this.productsCart.find((p) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      product.quantity -= 1;
      window.alert(`Do you want to add ${product.name} To Cart?`);
    } else {
      this.productsCart.push({ ...product, quantity: 1 });
      product.quantity -= 1;
      window.alert(`Do you want to add ${product.name} To Cart?`);
    }

    this.calculateTotalPrice();
  }


  ngOnDestroy(): void {
    this.dataService.ngOnDestroy();
  }
}

