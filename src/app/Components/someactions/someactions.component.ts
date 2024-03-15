import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpproductsService } from '../../Services/httpproducts.service';
import { IProduct } from '../../models/iproduct';

@Component({
  selector: 'app-someactions',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './someactions.component.html',
  styleUrl: './someactions.component.css'
})
export class SomeactionsComponent implements OnInit {
  productId: number | undefined;
  productForm!: FormGroup;
  productbyId: number =0;
  product: IProduct | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private httpProductsService: HttpproductsService
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
      discount: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(1)]],

    });
  }

  getIsError(controlName: string, errorname: string) {
    const control = this.productForm.get(controlName);
    return control ? control.hasError(errorname) : false;
  }

  //   return (
  //     this.productForm.controls[controlName].dirty &&
  //     this.productForm.controls[controlName].touched &&
  //     this.productForm.controls[controlName].errors?.[errorname]
  //   );
  // }

  generateNewId() {
    const newId = Math.floor(Math.random() * 1000) + 1;
    this.productForm.get('id')?.setValue(newId);
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    this.generateNewId();

    const formData = this.productForm.value;
    this.httpProductsService.addProduct(formData).subscribe(
      (response) => {
        confirm("Product added successfully")
        console.log('Product added successfully:', response);
        this.productForm.reset();
      },
      (error) => {
        console.error('Error adding product:', error);
      }
    );
  }

  getProductById(): void {
    if (!this.productbyId) {
      console.error('Product ID is required');
      return;
    }

    const productIdString = this.productbyId.toString();

    this.httpProductsService.getProductById(productIdString).subscribe(
      (response) => {
        this.product = response;
        this.productForm.patchValue({
          name: this.product.name,
          price: this.product.price,
          imgURL: this.product.imgURL,
          categoryID: this.product.categoryID,
          matrial: this.product.matrial,
          description: this.product.description,
          quantity: this.product.quantity,
          discount:this.product.discount
        });
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  updateProduct(): void {
    if (this.productForm.invalid) {
      return;
    }

    const updatedProduct = this.productForm.value;
    this.httpProductsService.updateProduct(updatedProduct).subscribe(
      (response) => {
        console.log('Product updated successfully:', response);
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }

}
