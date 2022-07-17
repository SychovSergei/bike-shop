import { Injectable } from "@angular/core";
import {map, Observable} from "rxjs";
import {Product} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})

export class ProductService {

  constructor(private http: HttpClient) {
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.firebase.databaseURL}/products/${id}.json`)
      .pipe(map((Product: Product) => {
        return {
          ...Product, id
        }
      }))
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      `${environment.firebase.databaseURL}/products.json`,
      product
    )
  }

  getAll(): Observable<Product[]> {
    return this.http.get(`${environment.firebase.databaseURL}/products.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key
          }))
      }))
  }

  remove(id: string) {
    return this.http.delete(`${environment.firebase.databaseURL}/products/${id}.json`)
  }

  updateProduct(id: string, prod: Product) {
    return this.http.patch(`${environment.firebase.databaseURL}/products/${id}.json`, prod)
  }

}
