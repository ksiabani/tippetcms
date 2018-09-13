import { Injectable } from "@angular/core";
import { Page } from "../../shared/model/get-pages.interface";
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
}
