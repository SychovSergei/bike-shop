import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup
  user: User
  submitted: boolean
  @Output() success = new EventEmitter<boolean>()

  constructor(
    public auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.submitted = false
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.minLength(2)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ])
    })
  }

  loginEmail() {
    if (this.loginForm.invalid) {
      return
    }
    this.submitted = true
    this.user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.auth.signIn(this.user)
      .subscribe(
        () => {
          this.success.emit(true)
          this.submitted = false
          this.router.navigate(['/'])
        },
        () => {
          this.submitted = false
        }
      )
  }

  loginGoogle() {
    this.auth.signInWithGoogle()
  }

}
