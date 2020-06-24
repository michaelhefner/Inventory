import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {

  date = new Date(Date.now());
  year = this.date.getFullYear();

  constructor() {
  }

  ngOnInit(): void {
  }

}
