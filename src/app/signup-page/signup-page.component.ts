import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserRegister} from "../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {UserService} from "../shared/services/user.service";
import {map} from "rxjs";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  signupForm: FormGroup;
  user: UserRegister;

  selectedRole: any = null;
  roles: any[] = [
    {name: 'Admin', key: 'admin'},
    {name: 'Owner', key: 'owner'},
    {name: 'Custom', key: 'custom'}
  ]
  submitted: boolean;
  @Output() success = new EventEmitter<boolean>()

  constructor(public auth: AuthService,
              private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.selectedRole = this.roles[0]
    this.submitted = false
    this.signupForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(2)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      role: new FormControl( this.selectedRole, [
        Validators.required
      ])
    })
  }

  submit() {
    if (this.signupForm.invalid) {
      return
    }
    this.submitted = true
    this.user = {
      displayName: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      role: this.signupForm.value.role.key,
      uid: ''
    }

    this.auth.signUp(this.user)
      .pipe(
        map(resp => {
            return {
              displayName: this.user.displayName,
              email: resp.user.email,
              uid: resp.user.uid,
              role: this.user.role
            }
          }
        )
      )
      .subscribe({
        next: res => {
          this.userService.save(res)
          this.success.emit(true)
          this.submitted = false
        },
        error: () => {
          this.submitted = false
        }
      })
  }

}
