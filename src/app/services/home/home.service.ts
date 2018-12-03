import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Featured } from "../../shared/models/featured.model";
import { BuyerRequest } from "../../shared/models/buyersRequest.model";
import { Observable } from "rxjs";
import config from "../../shared/config/config";

@Injectable({ providedIn: "root" })
export class HomeService {
  constructor(private http: HttpClient) {}

  /* ============================================================
     ==================== get single microjob ====================*/
  getSingleMicrojob(id): Observable<any> {
    return this.http.get<any>(`${config.url}/getSingleMicrojob/${id}`);
  }
  /* ============================================================
     ==================== get single hourly ====================*/
  getSingleHourly(id): Observable<any> {
    return this.http.get<any>(`${config.url}/getSingleHourly/${id}`);
  }
  /* ============================================================
     ==================== get single microjob ====================*/
  getSingleBuyerRequest(id): Observable<any> {
    return this.http.get<any>(`${config.url}/getSingleBuyerRequest/${id}`);
  }

  /* ============================================================
     ==================== get single microjob ====================*/
  getSinglePortfolio(id): Observable<any> {
    return this.http.get<any>(`${config.url}/getSinglePortfolio/${id}`);
  }
  /* ============================================================
     ==================== get category data ====================*/
  getCategoryPost(type, id): Observable<any> {
    return this.http.get<any>(`${config.url}/getCategoryPost/${type}/${id}`);
  }

  /* ============================================================
     ==================== get sub category post ====================*/
  getSubCategoryPost(type, id): Observable<any> {
    return this.http.get<any>(`${config.url}/getSubCategoryPost/${type}/${id}`);
  }
}
