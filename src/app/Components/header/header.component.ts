import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { HomeComponent } from '../home/home.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchService } from '../../Services/searchservice.service';
import { UserService } from '../../Services/user.service';
import { Myuser } from '../../models/myuser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HomeComponent, FormsModule, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user!: Myuser | null;

  constructor(
    public searchservice: SearchService,
    private userservice: UserService
  ) {}
  ngOnInit(): void {
    this.userservice.getUserSubject().subscribe((user) => {
      this.user = user;
    });
  }
  firstroutes = [
    { path: 'signup', title: 'Sign Up' },
    { path: 'login', title: 'Login' },
  ];
  routes = [
    { path: 'home', title: 'Home' },
    { path: 'Cart', title: 'Cart' },
    { path: 'aboutus', title: 'About' },
    { path: 'contactus', title: 'Contact' },
    { path: 'delet', title: 'Delete' },
    { path: 'edit', title: 'Edit' },
    { path: 'action', title: 'Add' },
  ];

  logout() {
    this.userservice.removeUser();
    alert('Are You Sure ?');
  }
}
