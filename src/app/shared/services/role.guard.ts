import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {map, Observable, switchMap} from "rxjs";
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate{
  userRole: string

  constructor(
    private auth: AuthService,
    private userService: UserService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user$.pipe(
      switchMap(user => this.userService.get(user?.uid!)),
      map(res => {
        return route.data['role'].includes(res.role)
      })
    )
  }


}
