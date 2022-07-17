import { Component, OnInit } from '@angular/core';

import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-related-links',
  templateUrl: './related-links.component.html',
  styleUrls: ['./related-links.component.scss']
})
export class RelatedLinksComponent implements OnInit {
  user$: any

  constructor(
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.user$ = this.afAuth.authState
    // .subscribe(
    //   res => {
    //   if (res) {
    //     console.log('res', res)
    //   } else {
    //     console.log('else')
    //   }
    // }
    // )
  }

}
