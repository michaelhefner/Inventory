import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DbControllerService} from '../../db/db-controller.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.sass']
})
export class SearchItemComponent implements OnInit {

  itemToShow;
  filteredItems = [];
  formGroup: FormGroup;
  private items = [];

  constructor(private dbControllerService: DbControllerService) {
  }

  ngOnInit(): void {
    this.dbControllerService.select('parts').then(res => {
      res.forEach(item => {
        this.items.push(item);
      });
    });
    this.formGroup = new FormGroup({
      searchItems: new FormControl('')
    });
    this.filteredItems = this.items;
  }

  showItemPage(item) {
    this.itemToShow = item;
  }

  searchInputChange(e: any) {
    const list = [];
    this.items.map((res) => {
      // console.log(res);
      if (res.name.toLowerCase().indexOf(e) !== -1 || res.description.toLowerCase().indexOf(e) !== -1) {
        list.push(res);
      }
    });
    console.log(this.filteredItems.length);
    this.filteredItems = list;
  }
}
