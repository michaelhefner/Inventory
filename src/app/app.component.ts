import {Component, OnInit} from '@angular/core';
import 'firebase/auth';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.listener().subscribe(res => {
      if (!res) {
        this.router.navigate(['home']);
      }
    });

  }

}
