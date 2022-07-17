import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {map, Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()

export class AuthGuard implements CanActivate{

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user$.pipe(
      map(user => {
        if (user) {
          return true
        }
        this.router.navigate(['/'],
          { queryParams: { returnUrl: state.url } })
        return false
      })
    )
  }

}
