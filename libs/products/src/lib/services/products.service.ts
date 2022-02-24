import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Product } from '../models/product';
import { map, Observable } from 'rxjs';
import { environment } from '@env/environment';
 
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURLproducts = environment.apiURL + 'products';

  constructor(private http: HttpClient) { }

  getProducts(categoriesFilter?: (string|undefined)[]): Observable<Product[]>{
    let params = new HttpParams();
    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','))
    }
    return this.http.get<Product[]>(this.apiURLproducts, { params: params });
  }

  getProduct(productId: string): Observable<Product>{
    return this.http.get<Product>(`${this.apiURLproducts}/${productId}`);
  }

  createProduct(productData: FormData): Observable<Product>{
    return this.http.post<Product>(this.apiURLproducts, productData);
  }

  updateProduct(productData: FormData, productid: string): Observable<Product> {
    return this.http.put<Product>(`${this.apiURLproducts}/${productid}`, productData);
  }

  deleteProduct(productId: string): Observable<any>{
    return this.http.delete<any>(`${this.apiURLproducts}/${productId}`);
  }

  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLproducts}/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }

  getFeaturedProducts(count:number): Observable<Product[]>{
    return this.http
      .get<Product[]>(`${this.apiURLproducts}/get/featured/${count}`);
  }
}
