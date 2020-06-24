import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-show-items',
  templateUrl: './show-items.component.html',
  styleUrls: ['./show-items.component.sass']
})
export class ShowItemsComponent implements OnInit {
  @Input() filteredItems;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.filteredItems);
  }

}
