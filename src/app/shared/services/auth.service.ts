import {Injectable} from "@angular/core";
import {User} from "../interfaces";
import {catchError, from, Observable, Subject, throwError} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ActivatedRoute} from "@angular/router";
import * as firebase from "@angular/fire/auth"

@Injectable()

export class AuthService {
  public error$: Subject<string> = new Subject<string>()
  displayName: string
  user$: Observable<firebase.User | null>

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute
  ) {
    // @ts-ignore
    this.user$ = this.afAuth.authState

  }

  signIn(user: any): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(user.email, user.password))
      .pipe(
        catchError(err => {
          this.handleError(err)
          return throwError(err)
        })
      )

  }
  private handleError(error: firebase.AuthError) {
    switch (error.code) {
      case 'auth/user-not-found':
        this.error$.next('User with this email not found')
        break;
      case 'auth/wrong-password':
        this.error$.next('Invalid password')
        break;
      case 'auth/email-already-in-use':
        this.error$.next('User with this email already registered')
        break;
    }
    return throwError(error)
  }

  signInWithGoogle() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
    localStorage.setItem('returnUrl', returnUrl)

    this.afAuth.signInWithRedirect(new firebase.GoogleAuthProvider())
  }

  logout() {
    this.afAuth.signOut()
  }

  signUp(user: User): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(user.email, user.password))
      .pipe(
        catchError(err => {
          this.handleError(err)
          return throwError(err)
        })
      )
  }
}
