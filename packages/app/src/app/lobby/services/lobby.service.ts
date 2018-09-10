import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { GetSitesResponse } from "../../shared/model/get-sites.interface";
import { NewProjectData } from "../components/add-project-dialog/add-project-dialog.component";

@Injectable({
  providedIn: "root"
})
export class LobbyService {
  constructor(private http: HttpClient) {}

  getSites(username): Observable<GetSitesResponse> {
    return this.http.get<GetSitesResponse>(`${environment.api.lobby}/${username}`);
  }

  addSite(newProjectData: NewProjectData): Observable<{ sucess: boolean }> {
    return this.http.post<{ sucess: boolean }>(environment.api.lobby, newProjectData);
  }
}
