import {Component, OnInit} from '@angular/core';
import {DbControllerService} from '../../db/db-controller.service';

@Component({
  selector: 'app-show-items',
  templateUrl: './show-items.component.html',
  styleUrls: ['./show-items.component.sass']
})
export class ShowItemsComponent implements OnInit {

  items = [];

  constructor(private dbControllerService: DbControllerService) {
  }

  ngOnInit(): void {
    this.dbControllerService.select('parts').then(res => {
      res.forEach(item => {
        this.items.push(item);
      });
    });
  }

}
