import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { GetSitesResponse } from "shared";
import { NewProjectData } from "../components/add-project-dialog/add-project-dialog.component";

@Injectable({
  providedIn: "root"
})
export class LobbyService {
  constructor(private http: HttpClient) {}

  getSites(username): Observable<GetSitesResponse> {
    return this.http.get<GetSitesResponse>(`${environment.api.lobby}/${username}`);
  }

  addSite(newProjectData: NewProjectData): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(environment.api.lobby, newProjectData);
  }

  removeSite(user, site): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${environment.api.lobby}/${user}/${site}`);
  }
}
