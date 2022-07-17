import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  @ViewChild('f') signupForm: NgForm

  name: string
  surename: string
  email: string
  description: string


  constructor() {}

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.signupForm)
  }
}
