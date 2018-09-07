import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { GetSitesResponse } from "../../shared/model/get-sites.interface";

@Injectable({
  providedIn: "root"
})
export class LobbyService {
  constructor(private http: HttpClient) {}

  getSites(username): Observable<GetSitesResponse> {
    return this.http.get<GetSitesResponse>(`${environment.api.lobby}/${username}`);
  }
}
