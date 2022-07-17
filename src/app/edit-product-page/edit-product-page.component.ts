import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Product, Color, Shipping, Shop, Size} from "../shared/interfaces";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../shared/services/product.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-edit-product-page',
  templateUrl: './edit-product-page.component.html',
  styleUrls: ['./edit-product-page.component.scss'],
})
export class EditProductPageComponent implements OnInit {
  productForm: FormGroup;
  product: Product;
  id: string;
  name: string;
  uploadedFiles: any[] = [];

  main: any[];
  date: Date;
  minDateValue: Date;

  shopList: Shop[];
  shop: string[];
  shipping: Shipping[];
  colorList: Color[];
  color: string[];
  sizeList: Size[];
  size: string[];

  constructor(
              private http: HttpClient,
              private cardService: ProductService,
              private route: ActivatedRoute)
  {
    this.main = [
      {label: 'No', value: false},
      {label: 'Yes', value: true}
    ]
    this.shopList = [
      {name: 'Canada Bike', code: 'canadabike'},
      {name: 'Amazon', code: 'amazon'},
      {name: 'Alibaba', code: 'alibaba'}
    ]
    this.shipping = [
      {name: 'Free shipping', code: 'free_shipping'}
    ]
    this.colorList = [
      {name: 'Blue', value: 'blue'},
      {name: 'Grey', value: 'grey'},
      {name: 'Orange', value: 'orange'},
      {name: 'Black', value: 'black'}
    ]
    this.sizeList = [
      {name: 'S', value: 's'},
      {name: 'L', value: 'l'},
      {name: 'XL', value: 'xl'},
      {name: 'XXL', value: 'xxl'}
    ]
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('cardId')) {
        this.cardService.getById(params['cardId']).subscribe((prod) => {
          this.product = prod
          this.updateForm(params['cardId'])
        })
      }
    })
    this.minDateValue = new Date()
    this.productForm = new FormGroup({
      name: new FormControl( '', [
        Validators.required,
        Validators.minLength(2)
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.min(0.01)
      ]),
      main: new FormControl(false, [
        Validators.required
      ]),
      shop: new FormControl(null, [
        Validators.required
      ]),
      description: new FormControl('', [
        Validators.required
      ]),
      shipping: new FormControl(null),
      discount: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(100)
      ]),
      discountUntil: new FormControl('', [
        Validators.required
      ]),
      new: new FormControl(false),
      color: new FormControl('', [
        Validators.required
      ]),
      size: new FormControl('', [
        Validators.required
      ]),
      imgUrl: new FormControl(null)
    })
  }

  updateForm(id: string) {
    this.id = id
    this.productForm.controls['name'].setValue(this.product.name)
    this.productForm.controls['price'].setValue(this.product.price)
    this.productForm.controls['main'].setValue(this.product.main)
    this.productForm.controls['shop'].setValue(this.product.shop)
    this.productForm.controls['description'].setValue(this.product.description)
    this.productForm.controls['shipping'].setValue(this.product.shipping)
    this.productForm.controls['discount'].setValue(this.product.discount)
    this.productForm.controls['discountUntil'].setValue(new Date(this.product.discountUntil))
    this.productForm.controls['new'].setValue(this.product.new)
    this.productForm.controls['color'].setValue(this.product.color)
    this.productForm.controls['size'].setValue(this.product.size)
    this.productForm.controls['imgUrl'].setValue(this.product.imgUrl)
  }

  onUpload(event:any) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  submit() {
    if (this.productForm.invalid) {
      return
    }

    this.product = {
      ...this.productForm.value,
      shipping: this.productForm.controls['shipping'].value,
      shop: this.productForm.controls['shop'].value,
      color: this.productForm.controls['color'].value,
      size: this.productForm.controls['size'].value,
      discountUntil: this.getDate(this.productForm.controls['discountUntil'].value)
    }
    this.cardService.updateProduct(this.id, this.product)
      .subscribe(() => {
        console.log('Update success')
      })

  }

  getFieldsName(object: Color[]): Array<string> {
    console.log('getFieldsName', object.map(a => a.name))
    return object.map(a => a.name)
  }

  getDate(object: Date): string {
    return object.toISOString().split('.')[0]
  }

}
