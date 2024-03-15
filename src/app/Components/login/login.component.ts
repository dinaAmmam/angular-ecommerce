import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { Iuser } from '../../models/user';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: Iuser = { email: '', password: '' };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router:Router
  ) {}

  onSubmit(signinForm: any) {
    this.authService.signin(signinForm.value).subscribe({
      next: (data) => {
        console.log("login successfully")
        this.userService.saveUser(data);
        confirm(`Hello ${this.user.email}`)
      },
      error: (error) => {
        console.log(error)
      },
    });
  }
  redirectTohome() {
    this.router.navigate(['/home']);
  }

}
