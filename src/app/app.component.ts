import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "./shared/services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) {
    auth.user$.subscribe(user => {
      if (user) {
        userService.userInfo$ = this.userService.get(user?.uid!)
        let returnUrl = localStorage.getItem('returnUrl')
        router.navigateByUrl(returnUrl!)
      }
    })
  }
  ngOnInit(): void {

  }

}
