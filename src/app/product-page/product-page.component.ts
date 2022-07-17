import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

import {Product} from "../shared/interfaces";
import {ProductService} from "../shared/services/product.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  title='Product list'
  products$: Observable<Product[]>

  constructor(
    private titleService: Title,
    private cardService: ProductService
  ) {
    this.titleService.setTitle("The best bikes in the world")
  }

  ngOnInit() {
    this.products$ = this.cardService.getAll()
  }

}
