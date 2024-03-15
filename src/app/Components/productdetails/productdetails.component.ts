import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { ProductService } from '../../Services/productservice.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { HttpproductsService } from '../../Services/httpproducts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CurrencyPipe,RouterModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})

export class ProductDetailsComponent implements OnInit {
  product: IProduct | undefined;
  isLastIndex: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpproduct:HttpproductsService
  ) {}


  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.paramMap.subscribe((param) => {
        const paramId = param.get('id');
        const id = paramId ? paramId : undefined;

        this.subscriptions.push(
          this.httpproduct.getProductById(id).subscribe((product) => {
            this.product = product;
          })
        );

        // this.isLastIndex = this.productService.isLastIndex(id);
      })
    )}

    goNext(id: number) {
      const nextId = this.productService.getNextProductId(id);
      this.router.navigate(['/product', nextId]);
    }

  goPrevious(id: number) {
    const previousId = this.productService.getPreviousProductId(id);
    this.router.navigate(['/product', previousId]);
  }

}


