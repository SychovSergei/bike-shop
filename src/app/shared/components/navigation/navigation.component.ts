import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {of} from "rxjs";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  displayModal: boolean

  constructor(
    public auth: AuthService,
    public userService: UserService
  ) { }

  ngOnInit(): void {}

  logout() {
    this.auth.logout()
    this.userService.userInfo$ = of(null)
  }

  showModalDialog() {
    this.displayModal = true
  }

}
