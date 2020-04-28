import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DbControllerService} from '../../db/db-controller.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.sass']
})
export class CreateItemComponent implements OnInit {

  error = {code: '', message: ''};
  createItem = new FormGroup({
    name: new FormControl(''),
    minStock: new FormControl(''),
    manPartNumber: new FormControl(''),
    currentQuantity: new FormControl(''),
    description: new FormControl(''),
    imageFile: new FormControl(''),
    location: new FormControl('')
  });
  names = [];
  item = 'Item';
  fileToUpload: File;


  constructor(private dbControllerService: DbControllerService, private router: Router) {
  }

  ngOnInit(): void {
  }

  handleFileInput(e) {
    console.log(e.target.files.item(0));
    if (e.target.files.length > 0) {
      this.fileToUpload = e.target.files.item(0);
    }
  }

  uploadFileToActivity() {
  }

  add() {
    // this.fileToUpload = this.createItem.get('imageFile').value;

    const formData = new FormData();
    formData.append('fileKey', this.fileToUpload, 'test');
    // this.dbControllerService.uploadImage(formData);
    this.dbControllerService.postFile(this.fileToUpload);

    const data = {
      name: this.createItem.value.name,
      minStock: this.createItem.value.minStock,
      manPartNumber: this.createItem.value.manPartNumber,
      currentQuantity: this.createItem.value.currentQuantity,
      description: this.createItem.value.description,
      imageFile: this.createItem.value.imageFile,
      location: this.createItem.value.location
    };
    if (this.createItem.value.name
      && this.createItem.value.minStock
      && this.createItem.value.manPartNumber
      && this.createItem.value.currentQuantity
      && this.createItem.value.description
      && this.createItem.value.location
    ) {
      this.dbControllerService.insert(data);
    }
    this.router.navigate(['']).then(res => console.log(res));
  }

  changeHandler(e) {
    this.item = (e !== '' ? e : 'Item');
  }

  // fileHandler(files: FileList) {
  //   this.file = files.item[0];
  // }
}
