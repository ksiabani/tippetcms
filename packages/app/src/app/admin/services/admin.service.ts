import { Injectable } from "@angular/core";
import { Page } from "shared/model/page.interface";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getPages(username: string, site: string, path: string): Observable<Page[]> {
    return this.http.get<Page[]>(`${environment.api.admin}/pages/${username}/${site}/${path}`);
  }

  getSinglePage(username: string, site: string, id: string): Observable<any> {
    return this.http.get<any>(`${environment.api.admin}/page/${username}/${site}/${id}`);
  }

  buildSite(username: string, site: string): Observable<any> {
    return this.http.put<any>(`${environment.api.admin}/sites/${username}/${site}`, null);
  }
}
