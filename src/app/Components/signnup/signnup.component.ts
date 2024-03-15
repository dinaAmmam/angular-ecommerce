import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Iuser } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signnup.component.html',
  styleUrl: './signnup.component.css',
})
export class SignupComponent {
  user: Iuser = {email:'', password: '' };

  constructor(
    private authService: AuthService, private router: Router
  ) {}

  onSubmit(signupForm: any) {
    this.authService.signup(signupForm.value).subscribe((data) => {
      console.log(data);
      confirm(`You are Sign in successfuly Ya ${this.user.email}`)
    });
  }
  redirectToLogin() {
    this.router.navigate(['/home']);
  }
}
