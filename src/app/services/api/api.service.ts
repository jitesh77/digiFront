import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import config from "../../shared/config/config";
@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}
  /* ============================================================
      ==================== get categories ====================*/
  getCategories(): Observable<any> {
    return this.http.get<any>(`${config.url}/getAllCategories`);
  }

  /* ============================================================
      ==================== get sub categories ====================*/
  getAllSubCategories(): Observable<any> {
    return this.http.get<any>(`${config.url}/getAllSubCategories`);
  }

  /* ============================================================
     ==================== get subcategories of a category ====================*/
  getSubCategory(id): Observable<any> {
    return this.http.get<any>(`${config.url}/category/${id}`);
  }
}
