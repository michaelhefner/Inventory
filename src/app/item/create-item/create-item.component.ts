import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DbControllerService} from '../../db/db-controller.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.sass']
})
export class CreateItemComponent implements OnInit {

  error = {code: '', message: ''};
  createItem;
  names = [];
  item = 'Item';
  fileToUpload: File;


  constructor(private dbControllerService: DbControllerService, private router: Router) {
  }

  ngOnInit(): void {
    this.createItem = new FormGroup({
      name: new FormControl('', Validators.required),
      minStock: new FormControl('', [Validators.required, Validators.min(0)]),
      manPartNumber: new FormControl('', Validators.required),
      currentQuantity: new FormControl('', [Validators.required, Validators.min(0)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      cost: new FormControl('', [Validators.required, Validators.min(0)]),
      imageFile: new FormControl(''),
      location: new FormControl('', Validators.required)
    });
  }

  handleFileInput(e) {
    console.log(e.target.files.item(0));
    if (e.target.files.length > 0) {
      this.fileToUpload = e.target.files.item(0);
    }
    console.log(this.fileToUpload.name.indexOf('.pdf') === this.fileToUpload.name.length - 4);
  }

  add(form) {
    if (form.status === 'VALID') {
      const data = {
        name: this.createItem.value.name,
        minStock: this.createItem.value.minStock,
        manPartNumber: this.createItem.value.manPartNumber,
        currentQuantity: this.createItem.value.currentQuantity,
        description: this.createItem.value.description,
        cost: this.createItem.value.cost,
        imageFile: this.fileToUpload ? this.fileToUpload.name : '',
        location: this.createItem.value.location
      };
      this.dbControllerService.insert(data, this.fileToUpload);
      this.router.navigate(['']).then(res => console.log(res));
    } else {
      this.error.message = 'There were errors on the form, please check that all fields are "green" and click done';
    }

  }


  changeHandler(e) {
    this.item = (e !== '' ? e : 'Item');
  }
}
