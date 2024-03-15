import { Component } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { HttpproductsService } from '../../Services/httpproducts.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delet',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css',
})
export class DeletComponent {
  product: IProduct | undefined;
  productId: number | undefined;

  constructor(private httpproduct: HttpproductsService) {}
  onDelet() {
    if (this.productId) {
      this.httpproduct.deleteProduct(this.productId).subscribe(
        () => {
          confirm(`Are you sure to delet this product ?`);
          console.log('Product deleted successfully');
        },
        (error) => {
          alert('This product is unavailable !');
          console.error('Error deleting product:', error);
        }
      );
    } else {
      console.error('Product ID is undefined');
    }
  }
}
