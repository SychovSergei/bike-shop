import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { faShoppingCart, faMagic, faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import {ProductService} from "../shared/services/product.service";
import {Observable, Subscription, switchMap} from "rxjs";
import {UserService} from "../shared/services/user.service";

interface AvailableProduct {
  color: Array<string>,
  size: Array<string>
}

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit, OnDestroy {
  PROD_DESCR_LIMIT_NUMBER = 150
  prodDescrLimitChar = this.PROD_DESCR_LIMIT_NUMBER
  isProdDescrFull: boolean = false
  available: boolean = false
  mainImgUrl: string
  availableProduct: AvailableProduct = {
    color: [ 'Blue', 'Grey', 'Black'],
    size: [ 'S', 'XXL']
  }
  form: FormGroup
  isAvailable: boolean = false

  product$: Observable<Product>
  mainImgUrlSub: Subscription
  tooltipEdit: any
  tooltipDelete: any
  delSub: Subscription

  constructor(
    library: FaIconLibrary,
    private router: Router,
    private route: ActivatedRoute,
    private cardService: ProductService,

    public userService: UserService
    ) {
    library.addIcons(faShoppingCart, faMagic, faPenSquare, faTrash)
  }

  ngOnInit() {
    this.tooltipEdit = 'Edit'
    this.tooltipDelete = 'Delete'
    this.product$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.cardService.getById(params['cardId'])
        })
      )

    this.mainImgUrlSub = this.product$.subscribe(resp => {this.mainImgUrl = resp.imgUrl} )

    this.form = new FormGroup({
      color: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required),
      quantity: new FormControl('1', [
        Validators.required,
        Validators.min(1),
        Validators.max(99),
        Validators.pattern('[0-9]*')
      ])
    })
  }

  ngOnDestroy(): void {
    if (this.mainImgUrlSub) {
      this.mainImgUrlSub.unsubscribe()
    }
    if (this.delSub) {
      this.delSub.unsubscribe()
    }
  }

  submit() {
    console.log('Form submitted', this.form)
  }

  selectImage(event: Event) {
    event.preventDefault()
    this.mainImgUrl = (event.target as Element).getAttribute('src')!
    const parentElem = (event.target as Element).closest('.img-thumbs')!.querySelectorAll('.img-thumb')
    parentElem.forEach(item => {
      item.classList.remove('active')
    });
    (event.target as Element).classList.add('active')
  }

  toggleDescriptionView(event: Event) {
    event.preventDefault()
    this.isProdDescrFull = !this.isProdDescrFull
    this.prodDescrLimitChar !== 0
      ? this.prodDescrLimitChar = 0
      : this.prodDescrLimitChar = this.PROD_DESCR_LIMIT_NUMBER
  }
  onChange() {
    if (this.form.get('color')!.valid && this.form.get('size')!.valid) {
      const foundColor = this.availableProduct.color.find(elem => elem.toLowerCase() === this.form.get('color')!.value)
      const foundSize = this.availableProduct.size.find(elem => elem.toLowerCase() === this.form.get('size')!.value)
      foundColor && foundSize ? this.isAvailable = true : this.isAvailable = false
    }
  }

  remove(id: string) {
    this.delSub = this.cardService.remove(id).subscribe(() => {
      this.router.navigate(['/'])
    })
  }

  edit(id: string) {
    this.router.navigate([`/edit/${id}`])
  }
}
