import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { HttpproductsService } from '../../Services/httpproducts.service';
import { IProduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action',
  standalone: true,
  imports: [FormsModule,HomeComponent],
  templateUrl: './action.component.html',
  styleUrl: './action.component.css'
})
export class ActionComponent implements OnInit {
  selectedCategoryId: number = 0;
  searchText: string = '';
  data: IProduct[] = [];
  filteredData: IProduct[] = [];

  constructor(private httpproduct: HttpproductsService) {}

  ngOnInit(): void {
    this.httpproduct.getallproduct().subscribe((responseData) => {
      this.data = responseData;
      this.filterData();
    });
  }

  filterData(): void {
    this.filteredData = this.data.filter(item => {
      if (item && item.name) {
        let categoryMatch = this.selectedCategoryId === 0;
        let searchTextMatch = item.name.toLowerCase().includes(this.searchText.toLowerCase());
        return categoryMatch && searchTextMatch;
      }
      return false;
    });
  }

}

