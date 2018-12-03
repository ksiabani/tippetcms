import { Injectable } from "@angular/core";
import { Page, PageTemplate, Section } from "shared/model/page.interface";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { xFile } from "shared";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getPages(username: string, site: string, path: string): Observable<xFile[]> {
    return this.http.get<xFile[]>(
      `${environment.api.admin}/pages/${username}/${site}/${path}`
    );
  }

  getSinglePage(username: string, site: string, id: string): Observable<Page> {
    return this.http.get<any>(
      `${environment.api.admin}/page/${username}/${site}/${id}`
    );
  }

  buildSite(username: string, site: string): Observable<any> {
    return this.http.put<any>(
      `${environment.api.admin}/sites/${username}/${site}`,
      null
    );
  }

  savePage(
    username: string,
    site: string,
    id: string,
    page: Page
  ): Observable<Page> {
    return this.http.put<any>(
      `${environment.api.admin}/page/${username}/${site}/${id}`,
      { page }
    );
  }

  createPage(
    username: string,
    site: string,
    title: string,
    path: string,
    template: string,
    isIndex: boolean
  ): Observable<Page> {
    return this.http.post<any>(
      `${environment.api.admin}/page/${username}/${site}`,
      { title, path, template, isIndex }
    );
  }

  createSection(
    username: string,
    site: string,
    pageId: string,
    title: string,
    description: string,
    template: string
  ): Observable<Page> {
    return this.http.post<any>(
      `${environment.api.admin}/page/${username}/${site}/${pageId}/section`,
      { title, description, template }
    );
  }

  getMedia(username: string, site: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${environment.api.admin}/media/${username}/${site}`
    );
  }

  removeMedia(
    username: string,
    site: string,
    mediaName: string
  ): Observable<any> {
    return this.http.delete<any>(
      `${environment.api.admin}/media/${username}/${site}/${mediaName}`
    );
  }

  getPageTemplates(username: string, site: string): Observable<PageTemplate[]> {
    return this.http.get<PageTemplate[]>(
      `${environment.api.admin}/sites/${username}/${site}/templates`
    );
  }

  getFolders(username: string, site: string): Observable<xFile[]> {
    return this.http.get<xFile[]>(
      `${environment.api.admin}/sites/${username}/${site}/folders`
    );
  }

  getSectionTemplates(
    username: string,
    site: string,
    pageId: string
  ): Observable<Section[]> {
    return this.http.get<Section[]>(
      `${environment.api.admin}/sites/${username}/${site}/${pageId}/sections`
    );
  }

  publishSite(username: string, site: string, remote: string): Observable<any> {
    return this.http.put<any>(
      `${environment.api.admin}/repos/${username}/${site}`,
      { remote }
    );
  }

  getRemoteRepo(
    username: string,
    site: string
  ): Observable<{ remote: string }> {
    return this.http.get<{ remote: string }>(
      `${environment.api.admin}/sites/${username}/${site}/remote`
    );
  }
}
