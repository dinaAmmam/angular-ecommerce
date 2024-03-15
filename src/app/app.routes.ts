import { Routes } from '@angular/router';
import { CartComponent } from './Components/cart/cart.component';
import { ProductDetailsComponent } from './Components/productdetails/productdetails.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { ContactusComponent } from './Components/contactus/contactus.component';
import { AboutusComponent } from './Components/aboutus/aboutus.component';
import { ActionComponent } from './Components/action/action.component';
import { SomeactionsComponent } from './Components/someactions/someactions.component';
import { EditComponent } from './Components/edit/edit.component';
import { DeletComponent } from './Components/delete/delete.component';
import { SignupComponent } from './Components/signnup/signnup.component';
import { LoginComponent } from './Components/login/login.component';
import { authGuard } from './Gurards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  {
    path: 'home',
    component: ActionComponent,
    title: 'HOME',
    canActivate: [authGuard],
  },
  { path: 'Cart', component: CartComponent, title: 'Cart' },
  { path: 'product/:id', component: ProductDetailsComponent, title: 'Product' },
  { path: 'contactus', component: ContactusComponent, title: 'Contact Us' },
  { path: 'aboutus', component: AboutusComponent, title: 'About Us' },
  { path: 'action', component: SomeactionsComponent, title: 'Action' },
  { path: 'edit', component: EditComponent, title: 'Edit' },
  { path: 'delet', component: DeletComponent, title: 'Delete' },
  { path: 'signup', component: SignupComponent, title: 'Sign Up' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: '**', component: NotfoundComponent, title: 'Error Page' },
];
