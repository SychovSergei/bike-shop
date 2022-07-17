import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable, from} from "rxjs";
import {AppUser} from "../interfaces";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  userInfo$: Observable<AppUser | null>

  constructor( private afs: AngularFirestore ) {}

  save(newUser: any): Observable<any> {
    return from(this.afs.doc(`users/${newUser.uid}`).set({
      displayName: newUser.displayName,
      email: newUser.email,
      uid: newUser.uid,
      role: newUser.role
    }).catch(err => {
      console.log("err", err)
    }))
  }

  get(uid: string): Observable<any> {
    const doc = this.afs.firestore
      .collection('users').doc(`${uid}`)

    return from(doc.get()).pipe(
      map(res => {
        return res.data()
      })
    )
  }

}
