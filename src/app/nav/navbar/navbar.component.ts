import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  isSignedIn: boolean;
  title = 'Inventory';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.listener().subscribe(res => this.isSignedIn = res);
  }

  SignIn() {
    this.router.navigate(['sign_in']).catch(error => console.log(error));
  }

  SignOut() {
    console.log('Sign Out');
    this.authService.signOut();
  }

  register() {
    this.router.navigate(['register']).catch(error => console.log(error));
  }
}
