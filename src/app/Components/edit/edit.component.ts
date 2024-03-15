import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProduct } from '../../models/iproduct';
import { HttpproductsService } from '../../Services/httpproducts.service';
import { CommonModule } from '@angular/common';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {


  productId: number |string| undefined;
  productForm!: FormGroup;
  productbyId: number = 0;
  product: IProduct | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private httpProductsService: HttpproductsService,
    private http:HttpClient
  ) {}


  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [
        null,
        [Validators.required, Validators.min(100), Validators.max(1000000)],
      ],
      imgURL: ['', [Validators.required]],
      categoryID: [1, [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      matrial: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(1)]],

    });
  }

  getIsError(controlName: string, errorname: string) {
    return (
      this.productForm.controls[controlName].dirty &&
      this.productForm.controls[controlName].touched &&
      this.productForm.controls[controlName].errors?.[errorname]
    );
  }

  generateNewId() {
    if (this.productForm && this.productForm.get('id')) {
      const newId = Math.floor(Math.random() * 1000) + 1;
      this.productForm.get('id')!.setValue(newId);
    } else {
      console.error('productForm or id control is null');
    }
  }

  onProductIdChange(event: any): void {
    this.productbyId = event.target.value;
    console.log('Product ID changed:', this.productbyId);
  }



  getProductById(): void {
    if (this.productbyId === undefined) {
      console.log('Invalid Product ID:', this.productbyId);
      console.error('Product ID is required');
      return;
    }


    const productIdString: string = this.productbyId.toString();

    console.log('Fetching product details for ID:', productIdString);
    this.httpProductsService.getProductById(productIdString).subscribe(
      (response) => {
        this.product = response;
        console.log('Product details fetched successfully:', this.product);
        this.productForm.patchValue({
          id:productIdString,
          name: this.product.name,
          price: this.product.price,
          imgURL: this.product.imgURL,
          matrial: this.product.matrial,
          description: this.product.description,
          quantity: this.product.quantity,
          discount:this.product.discount,

        });
  
      },
      (error) => {
        alert("This product is unavailable !")
        console.error('Error fetching product details:', error);
      }
    );
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    if (!this.productbyId || isNaN(this.productbyId)) {
      console.error('Invalid Product ID:', this.productbyId);
      return throwError('Product ID is required');
    }

    const productIdString: string = this.productbyId.toString();
    console.log('Updating product with ID:', productIdString);

    return this.http.put<IProduct>(`http://localhost:3000/products/${productIdString}`, product).pipe(
      tap((response) => {
        console.log('Product updated successfully:', response);
      }),
      catchError((error) => {
        console.error('Error updating product:', error);
        return throwError('Error updating product');
      })
    );
  }
}
